function CustomVarLibraryNameAppendPlugin(options)
{
	this.options = options;
}

CustomVarLibraryNameAppendPlugin.prototype.apply = function (compiler)
{
	var _this = this;
	var replaceMap = null;

	if (typeof _this.options.name === 'object')
	{
		replaceMap = Object.keys(_this.options.name)
			.reduce(function (prev, key)
			{
				if (_this.options.name[key].var)
				{
					prev.push(
						{
							replace: 'root["' + key + '"]',
							with: 'root["' + _this.options.name[key].var + '"] = ' +
								// [Yagasoft | 2018-07-31 | Add] append logic
								'root.' + _this.options.name[key].var +
								' ? Object.assign(root.' + _this.options.name[key].var + ', factory())' +
								' : factory(); //'
						});
				}

				if (_this.options.name[key].file)
				{
					prev.push(
						{
							replace: key + '.min.js.map',
							with: _this.options.name[key].file + '.min.js.map'
						});

					prev.push(
						{
							replace: key + '.js',
							with: _this.options.name[key].file + '.js'
						});

					prev.push(
						{
							replace: key + '.min.js',
							with: _this.options.name[key].file + '.min.js'
						});
				}

				return prev;
			}, []);
	}

	function changeVarNames(path, data)
	{
		if (replaceMap)
		{
			if (data.chunk && data.chunk.name)
			{
				path = path.replace('[name]', data.chunk.name);
			}

			return replaceMap
				.reduce(function (prev, curr)
				{
					return prev.replace(curr.replace, curr.with);
				}, path);
		}
		else
		{
			return path.indexOf('root[') === 0
				// [Yagasoft | 2018-07-31 | Add] append logic
				? 'root["' + _this.options.name + '"] = ' +
				'root.' + _this.options.name +
				' ? Object.assign(root.' + _this.options.name + ', factory())' +
				' : factory(); //'
				: path;
		}
	}

	if (compiler.hooks)
	{
		// Webpack 4 
		compiler.hooks.compilation.tap(
			'CustomVarLibraryNameAppendPlugin',
			function (compilation)
			{
				compilation.mainTemplate.hooks.assetPath
					.tap('CustomVarLibraryNameAppendPluginAssetPath', changeVarNames);
			});
	}
	else
	{
		// Webpack 2-3
		compiler.plugin(
			'compilation',
			function (compilation)
			{
				compilation.mainTemplate.plugin('asset-path', changeVarNames);
			});
	}
};

module.exports = CustomVarLibraryNameAppendPlugin;
