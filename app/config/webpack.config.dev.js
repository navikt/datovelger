const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: [
		'babel-polyfill',
		require.resolve('react-dev-utils/webpackHotDevClient'),
		'./src/index.tsx'
	],
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
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
					{
						loader: 'style-loader'
					},
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
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Whoo',
			template: './public/index.html'
		}),
		new webpack.NamedModulesPlugin(),
		new CaseSensitivePathsPlugin(),
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
