const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: ['babel-polyfill', './src/index.tsx'],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: [{ loader: 'babel-loader' }],
				exclude: /node_modules/
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'less-loader',
						options: {
							globalVars: {
								coreModulePath: '"~"',
								nodeModulesPath: '"~"'
							}
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		})
	]
};
