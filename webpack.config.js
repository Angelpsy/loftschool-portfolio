const fs = require('fs');
const path = require('path');
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
 * @param {{prod: Number, dev: Number, prod: Number,}} env
 * @return {{entry: Object, output: {path: string, filename: string}, plugins: Array.<*>, module: {rules: [null,null,null,null,null,null,null,null]}, devtool: string, devServer: {hot: boolean, inline: boolean, contentBase: string, compress: boolean, port: number, stats: string}, stats: string}}
 */
module.exports = (env={}) => {
    const isProd = !!env.prod;
    const isServer = !!env.server;
    const isMarkup = !!env.markup;
    const nameBase = '[name]' + (isProd ? '.[hash]' : '');
    const name = nameBase + '.[ext]';
    const fileNameJs = nameBase + '.js';
    const fileNameCss = nameBase + '.css';
    const publicPath = !env.ghpages ? PATHS.public : PATHS.ghPage;

    /**
     * @type {Object}
     */
    const entriesKeys = {
        'common': `${PATHS.src}/common/scripts/common.js`,
    };

    /**
     * @type {Array}
     */
    const HtmlWebpackPlugins = [];

    const data = {};

    fs
        .readdirSync(path.resolve(PATHS.src, 'data'))
        .filter((file) => {
            return file.indexOf('base') !== 0 && file.search(/\.json/) + 1;
        })
        .forEach((file) => {
            const _dataFile = JSON.parse(fs.readFileSync(path.resolve(PATHS.src, 'data', file), 'utf8')).data;
            Object.assign(data, _dataFile );
        });

    pages.forEach((page) => {
        entriesKeys[page] = `${PATHS.src}/pages/${page}/index.js`;
        HtmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                filename: `${page}.html`,
                chunks: ['common', page],
                template: `${PATHS.src}/pages/${page}/index.pug`,
                data: {data},
            })
        );
    });
    if (isServer && isMarkup) {
        // LR при изменении pug файлов,
        // Попбочный эффекта: не работает HMR для стилей
        HtmlWebpackPlugins.push(
            new ReloadPlugin()
        );
    }

    return {
        entry: entriesKeys,
        output: {
            path: isServer ? PATHS.dev : PATHS.build,
            filename: PATHS.static + 'js/' + fileNameJs,
        },
        plugins: [
            new CleanPlugin([isServer ? PATHS.dev : PATHS.build]),
            new ExtractTextPlugin({
                filename: PATHS.static + 'css/' + fileNameCss,
                disable: isServer,
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: PATHS.static + 'js/' + fileNameJs,
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
        resolve: {
            alias: {},
            modules: ['node_modules', PATHS.src, './'],
        },
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
                        fallback: 'style-loader',
                        use: ['css-loader?sourceMap', 'postcss-loader', 'sass-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
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
                        publicPath: publicPath,
                        outputPath: 'content/img/',
                        limit: 4000,
                    },
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'url-loader',
                    exclude: /content/,
                    query: {
                        name,
                        publicPath: publicPath,
                        outputPath: PATHS.static + 'img/',
                        limit: 4000,
                    },
                },
                {
                    test: /\.svg$/,
                    include: /sprite/,
                    exclude: /bg/,
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                extract: false,
                            },
                        },
                        'svgo-loader',
                    ],
                },
                {
                    test: /\.svg$/,
                    exclude: /sprite/,
                    loader: 'url-loader',
                    query: {
                        name,
                        publicPath: publicPath,
                        outputPath: PATHS.static + 'img/',
                        limit: 4000,
                    },
                },
                {
                    test: /\.(ttf|eot|woff(2)?)$/,
                    loader: 'url-loader',
                    query: {
                        name,
                        publicPath: publicPath,
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
            stats: 'minimal',
        },
    };
};
