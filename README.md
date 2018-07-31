# CustomVarLibraryNameAppendPlugin
### Version: 2.1.1
---

A WebPack plugin to allow to set a different module name to the var `libraryTarget` and the AMD/CommonJS when using `libraryTarget:'umd'`.
The latest release adds the hability to change the file name and handle multiple bundle names.
The plugin appends the module to the var intead of overwrite.

## Install

```
$ npm i -D webpack-custom-var-library-name-plugin-append
```

## Usage

```js
var CustomVarLibraryNameAppendPlugin = require('webpack-custom-var-library-name-append-plugin');

var webpackConfig = {
    ...
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].min.js',
        library: 'some-name',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    ...
    plugins: [
        ...
        new CustomVarLibraryNameAppendPlugin({
          name: 'var-name'
        }),
        ...
    ],
...
```

```js
var CustomVarLibraryNameAppendPlugin = require('webpack-custom-var-library-name-append-plugin');

    plugins: [
        ...
        new CustomVarLibraryNameAppendPlugin({
          name: {
            'chunk-name': {
                var: 'var-name',
                file: 'file-name'
            }
          }
        }),
        ...
    ],
...
```

---
**Copyright &copy; by Ahmed el-Sawalhy ([Yagasoft](http://yagasoft.com))** -- _GPL v3 Licence_
