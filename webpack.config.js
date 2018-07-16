const path = require('path');
const GasPlugin = require("gas-webpack-plugin");
const es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'code.gs',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new GasPlugin(),
    new es3ifyPlugin()
  ]
};
