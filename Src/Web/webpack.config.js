var webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function (env) {
    env = env || {};
    var isProd = env.NODE_ENV === 'production';

    var config = {
        mode: isProd ? 'production' : 'development',
        entry: {
            home: "./FrontEnd/jsx/Containers/Home.jsx"
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
                }
            }
        },
        devtool: 'eval-source-map',
        plugins: [
            new BundleAnalyzerPlugin(),
            new MiniCssExtractPlugin({ filename: '[name].css' }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery"
            }),
            new webpack.ProvidePlugin({ moment: "moment" }),
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/)
        ],
        module: {
            rules: [
                {
                    test: /\.m?jsx$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: { minimize: isProd }
                        },
                        { loader: 'resolve-url-loader' },
                        { loader: 'sass-loader' }
                    ]
                },
                {
                    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?limit=10000'
                },
                {
                    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                    use: 'file-loader'
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loader: 'file-loader',
                    query: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                },
                {
                    test: /font-awesome\.config\.js/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'font-awesome-loader' }
                    ]
                },
                {
                    test: /\.css$/,
                    loaders: ["style-loader", "css-loader"]
                }
            ]
        },
        resolve: {
            alias: {
                'jquery-ui/datepicker': 'jquery-ui/ui/widgets/datepicker'
            }
        }
    };

    // Alter config for prod environment
    if (isProd) {
        config.devtool = 'source-map';
        config.plugins = config.plugins.concat([
            new UglifyJsPlugin({
                sourceMap: true
            })
        ]);
    }

    return config;
};