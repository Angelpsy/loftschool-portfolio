const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const SERVER = require('./configs/server');
const PATHS = require('./configs/paths');
const pages = require('./configs/pages');

/**
 * @type {Object}
 */
const entriesKeys = {
    'common': `${PATHS.src}/common.js`,
};

/**
 * @param {{prod: Number, dev: Number, prod: Number,}} env
 * @return {{entry: Object, output: {path: string, filename: string}, plugins: Array.<*>, module: {rules: [null,null,null,null,null,null,null,null]}, devtool: string, devServer: {hot: boolean, inline: boolean, contentBase: string, compress: boolean, port: number, stats: string}, stats: string}}
 */
module.exports = (env={}) => {
    const isProd = !!env.prod;
    const isServer = !!env.server;
    const nameBase = '[name]' + (isProd ? '.[hash]' : '');
    const name = nameBase + '.[ext]';
    const fileNameJs = nameBase + '.js';
    const fileNameCss = nameBase + '.css';

    /**
     * @type {Array}
     */
    const HtmlWebpackPlugins = [];

    pages.forEach((page) => {
        entriesKeys[page] = `${PATHS.src}/pages/${page}/index.js`;
        HtmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                filename: `${page}.html`,
                chunks: ['common', page],
                template: `${PATHS.src}/pages/${page}/index.pug`,
            })
        );
    });
    if (isServer) {
        HtmlWebpackPlugins.push(
            new ReloadPlugin()
        );
    }

    return {
        entry: entriesKeys,
        output: {
            path: isServer ? PATHS.dev : PATHS.build,
            filename: './' + PATHS.static + 'js/' + fileNameJs,
        },
        plugins: [
            new CleanPlugin([isServer ? PATHS.dev : PATHS.build]),
            new ExtractTextPlugin({
                filename: `${PATHS.public}${PATHS.static}css/${fileNameCss}`,
                disable: isServer,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: './' + PATHS.static + 'js/' + fileNameJs,
                minChunks: 3,
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: isProd,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: isProd,
                    discardDuplicates: isProd,
                    minifyFontValues: {
                        removeQuotes: false,
                    },
                    discardUnused: false,
                    mergeIdents: false,
                    core: isProd,
                },
            }),
        ]
            .concat(HtmlWebpackPlugins),
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    include: PATHS.src,
                    loader: 'eslint-loader',
                    options: {
                        quiet: true,
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: !isProd,
                    },
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: './',
                        fallback: 'style-loader',
                        use: ['css-loader?sourceMap', 'postcss-loader', 'sass-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        publicPath: './',
                        fallback: 'style-loader',
                        use: ['css-loader?sourceMap', 'postcss-loader'],
                    }),
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'url-loader',
                    include: /content/,
                    query: {
                        name: (!isProd ? '[path]' : '') + name,
                        publicPath: PATHS.public,
                        outputPath: 'content/img/',
                        limit: 4000,
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'url-loader',
                    include: /assets/,
                    query: {
                        name: (!isProd ? '[path]' : '') + name,
                        publicPath: PATHS.public,
                        outputPath: PATHS.static + 'img/',
                        limit: 4000,
                    },
                },
                {
                    test: /\.ttf$/,
                    loader: 'url-loader',
                    query: {
                        name,
                        publicPath: PATHS.public,
                        outputPath: PATHS.static + 'fonts/',
                        limit: 4000,
                    },
                },
            ],
        },
        devtool: isProd ? 'source-map' : 'eval',
        devServer: {
            hot: true,
            inline: true,
            contentBase: PATHS.dev,
            port: SERVER.portsStatic,
            host: '0.0.0.0',
        },
    };
};
