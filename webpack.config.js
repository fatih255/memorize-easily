const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env, options ) => {
	return {
		entry: './src/block.js',

		output: {
			path: path.resolve( __dirname, 'build' ),
			filename: 'block.js',
		},

		devtool: 'cheap-eval-source-map',

		module: {
			rules: [
				{
					test: /\.jsx$|\.es6$|\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['react'],
						}
					},
					exclude: /(node_modules|bower_components)/
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								minimize: ( options.mode == 'production' ? true : false ),
								sourceMap: true,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [ require( 'autoprefixer' ) ]
							}
						},
					],
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images/'
							}
						}
					]
				},
			],
		},

		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.css',
				chunkFilename: '[id].css'
			})
		],

	}
};
webpack.v1.config.js
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const precss = require( 'precss' );
const svgFragments = require( 'postcss-svg-fragments' );
const pxtorem = require( 'postcss-pxtorem' );
const cssnano = require( 'cssnano' );
const path = require( 'path' );

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8881/',
      './app/App.js'
    ]
  },

  output: {
    path: path.resolve( __dirname, 'public' ),
    publicPath: '/js/',
    filename: 'main.js',
    sourceMapFilename: 'main.js.map'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },

  module: {
    preloaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loader: 'source-map', query: { presets: ['react', 'es2015'] }, exclude: /(node_modules|bower_components)/ }
    ],
    loaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loader: 'babel', query: { presets: ['react', 'es2015'] }, exclude: /(node_modules|bower_components)/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') },
      { test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=5'] }
    ]
  },

  devtool: "eval",

  postcss: function() {
    return [
        autoprefixer( { browsers: ['last 2 versions'] } ),
        precss,
        svgFragments,
        cssnano,
        pxtorem( {
          propWhiteList: [] // Enables converting of all properties - default is just font sizes.
        } )
    ];
  },

  plugins: [
    new ExtractTextPlugin( 'public/styles.css', {
      allChunks: true
    } )
  ]
};