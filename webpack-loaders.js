"use strict";


// Babel loader
exports.babel = {
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'babel-loader',
  query: {
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
  }
};