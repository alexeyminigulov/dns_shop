var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin('styles.css');
const extractSASS = new ExtractTextPlugin('libs.css');


module.exports = {
	entry: [
        './src/index.js'
    ],
	devtool: "source-map",
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: /node_modules/
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	comments: false,
		// 	mangle: false,
		// 	compress: {
		// 		warnings: true
		// 	}
		// }),
		// new webpack.optimize.UglifyJsPlugin(),
		extractCSS,
		extractSASS
	],
    module: {
		loaders: [
			// {
			// 	test:    /\.js$/,
			// 	loaders: ['babel-loader'],
			// 	exclude: '/node_modules/'
			// },
			{
				test: /\.js$/,
				exclude: /(node_modules|myLibs)/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test:    /\.css$/,
				use: extractCSS.extract([
					'css-loader?localIdentName=[hash:base64:5]',
					'postcss-loader'
					])
				// exclude: '/node_modules/'
			},
			{
				test:    /\.scss$/,
				use: extractSASS.extract([
					'css-loader?localIdentName=[hash:base64:5]',
					'sass-loader'
					])
				// exclude: '/src/'
			},
			{
                test: /\.html$/,
                exclude: [
                    /node_modules/,
                    /bower_components/
                ],
				loader: [ "html-loader" ]
            },
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
				loader: 'file-loader'
				// exclude: '/src/'
			}
		]
	},
	output: {
		path: path.join(__dirname, './../dist'),
		publicPath: '/dist/',
		filename: 'bundle.min.js'
	},
	externals: {
        "jquery": "jQuery",
		"$": "jQuery",
		"jQuery": "jQuery",
		"Materialize": "Materialize"
    }
};