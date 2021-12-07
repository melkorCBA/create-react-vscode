# Installation Guid
Run this to create a new project
```
npx create-react-vscode <your-project-name>
```
<p style="background-color: #f0f5f1; padding:10px;">
This is a react project generator with preconfigured vscode settings. This includes, Eslint & File associations for reactjavascript (jsx)
  
</p>
 

## Setup Guid
### This is the guid if you want to recreate this project manually
1. npm init
2. installing webpack
	```
	npm i webpack webpack-cli
	```
	```
    npm i webpack-dev-server
	```
3. installing Dependencies
	```
	npm i react react-dom
	```
4. Dev Dependencies
    ```
	npm i -D style-loader, css-loader
	```

	```
	npm i -D sass sass-loader
	```
    ```
	npm i -D mini-css-extract-plugin
	```
    ```
	npm i -D html-webpack-plugin
	```
    ```
	npm i -D clean-webpack-plugin
	```
	```
	npm i babel-loader @babel/core @babel/node @babel/preset-env @babel/preset-react
	```
	Eslint Dependencies
	```
	npm i -D @babel/eslint-parser babel-jest eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
	```
	Jest Dependencies
	```
	npm i -D jest babel-jest react-test-renderer -> ject testing library
	```
5. Eslint configrations

	Add .eslintrc.js file to root
	```javascript
	module.exports = {
  		parser: '@babel/eslint-parser',
 		root: true,
 		env: {
 		  browser: true,
 		  commonjs: true,
 		  es6: true,
 		  node: true,
 		  jest: true,
 		},
 		parserOptions: {
 		  babelOptions: {
 		    presets: ['@babel/preset-react'],
 		  },
 		  sourceType: 'module',
 		},
 		plugins: ['react', 'react-hooks'],
 		extends: [
 		  'eslint:recommended',
 		  'plugin:react/recommended',
 		  'plugin:react-hooks/recommended',
 		  'airbnb',
		],
		settings: {
			react: {
		      version: 'detect',
		    },
		},
		rules: {
			'linebreak-style': 0,
		    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
			'react/function-component-definition': [0],
		},
	};

	```

6. initlial directory structure

	```
	📦create-react-vscode
	 ┣ 📂.vscode
	 ┃ ┗ 📜settings.json
	 ┣ 📂node_modules
	 ┣ 📂src
	 ┃ ┣ 📂components
	 ┃ ┃ ┗ 📜App.js
	 ┃ ┣ 📂styles
	 ┃ ┃ ┗ 📜main.scss
	 ┃ ┣ 📜index.html
	 ┃ ┗ 📜index.js
	 ┣ 📜.eslintrc.js
	 ┣ 📜.gitignore
	 ┣ 📜babel.config.js
	 ┣ 📜package-lock.json
	 ┣ 📜package.json
	 ┣ 📜README.md
	 ┗ 📜webpack.config.js
	```

7. Configuring Webpack

	Add .webpack.config.js file to root with these settings

	```javascript
	/* eslint-disable global-require  */
	/* eslint-disable  new-cap */

	const path = require('path');

	const CURRENT_NPM_TASK = process.env.npm_lifecycle_event;
	const environment = CURRENT_NPM_TASK === 'build' ? 'production' : 'development';

	const { CleanWebpackPlugin: cleanWebpack } = require('clean-webpack-plugin');

	const plugins = {

	  miniCssExtract: require('mini-css-extract-plugin'),
	  htmlWebpack: require('html-webpack-plugin'),
	  cleanWebpack,
	};

	const config = {
	  entry: './src/index.js',
	  output: {
	    filename: 'main.[fullhash].js',
	    path: path.resolve(__dirname, 'dist'),
	  },
	  plugins: [new plugins.htmlWebpack({ template: './src/index.html' })],
	  devServer: {
	    port: 8080,
	    static: {
	      directory: path.join(__dirname, 'dist'),
	    },
	    hot: true,

	  },
	  mode: environment,
	  module: {
	    rules: [
	      {
	        test: /\.scss$/,
	        use: ['style-loader', 'css-loader', 'sass-loader'],
	      },
	      {
	        test: /\.css$/,
	        use: ['style-loader', 'css-loader'],
	      },
	      {
	        test: /\.m?js$/,
	        exclude: /(node_modules|bower_components)/,
	        use: {
	          loader: 'babel-loader',
	        },
	      },
	    ],
	  },

	};

	if (environment === 'production') {
	// eslint-disable-next-line no-console
	  console.log('environment:', environment);
	  config.module.rules[0].use[0] = plugins.miniCssExtract.loader;
	  config.module.rules[1].use[0] = plugins.miniCssExtract.loader;
	  config.plugins.push(
	    new plugins.miniCssExtract({ filename: 'main.[fullhash].css' }),
	    new plugins.cleanWebpack(),
	  );
	}

	module.exports = config;

	```
	

8. Creating npm Scripts for Development

	Add these script in package.json, scripts object,
	```json
	"scripts": {
    	"start": "npx webpack-dev-server",
    	"build": "npx webpack",
   	 	"test": "echo \"Error: no test specified\" && exit 1"
  	}
	```

		