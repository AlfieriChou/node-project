const webpcak = require('webpack');
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
	entry: [
	    './server.js'
	],
	output: {
	    path: path.resolve(__dirname, 'build'),
	    filename: 'bundle.js'
	},
	target: 'node',
	externals: nodeModules,
	context: __dirname,
	node: {
	    __filename: false,
	    __dirname: false
	},
	module: {
	    loaders: [{
	        test: /\.js$/,
	        loader: 'babel-loader',
	        exclude: [
	            path.resolve(__dirname, "node_modules"),
	        ],
	        query: {
	            plugins: ['transform-runtime'],
	            presets: ['es2015', 'stage-0'],
	        }
	    }, {
	        test: /\.json$/,
	        loader: 'json-loader'
	    }]
	},
	resolve: {
	    extensions: [ '.js', '.json']
	}
}
