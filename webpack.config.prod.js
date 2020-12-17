const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = [
    {
        mode: 'production',
        target: 'web',
        context: SRC_PATH,
        devtool: false,
        entry: [/*'@babel/polyfill', */'./ReactSurferSlider'],
        output: {
            path: DIST_PATH,
            filename: 'ReactSurferSlider.js',
            library: 'ReactSurferSlider',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'awesome-typescript-loader',
                    query: {
                        options: {
                            useCache: true,
                            useBabel: true,
                            babelCore: '@babel/core',
                            reportFiles: [
                                '**/*.{ts,tsx}',
                            ],
                        },
                    }
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread'
                        ]
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    loaders: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                }
            ]
        },
        externals: {
            react: 'react'
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                NODE_ENV: 'production'
            }),
            new CleanWebpackPlugin(DIST_PATH),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'ReactSurferSlider.css',
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()]
        }
    }
];
