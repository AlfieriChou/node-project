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
	externals: nodeModules
}