﻿var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    "dashboard": "./AppCompiled/Dashboard.js"
  },
  output: {
    path: path.resolve(__dirname, "wwwroot/js"),
    filename: "[name].js"
  },
  resolve: {
    alias: {
      'react': 'inferno-compat',
      'react-dom': 'inferno-compat'
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        properties: true,
        drop_debugger: true, // Remove debugger statements
        drop_console: true, // Remove console statements
        sequences: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        cascade: true,
        if_return: true,
        negate_iife: true,
        hoist_funs: true,
        hoist_vars: false,
        join_vars: true,
        warnings: false
      },
      comments: false
    })
  ]
}