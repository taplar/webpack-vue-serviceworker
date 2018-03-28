const cleanPlugin = require( 'clean-webpack-plugin' );
const htmlPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const workboxPlugin = require( 'workbox-webpack-plugin' );

module.exports = {
	entry: './src/application.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "less-loader" }
				]
			},
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
		]
	},
	performance: { hints: false },
	plugins: [
		new cleanPlugin( [ 'dist' ] ),
		new htmlPlugin( {
			appMountId: 'application',
			filename: 'index.html',
			inject: false,
			lang: 'en-US',
			mobile: true,
			template: require( 'html-webpack-template' ),
			title: 'My Application'
		} ),
		new workboxPlugin.GenerateSW( {
			swDest: 'sw.js',
			clientsClaim: true,
			skipWaiting: true
		} )
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'vue-resource$': 'vue-resource/dist/vue-resource.min.js'
		}
	}
};