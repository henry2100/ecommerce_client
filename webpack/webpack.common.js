const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// const dotenv = require('dotenv');
// const env = dotenv.config().parsed;

// const envKeys = Object.keys(env).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(env[next]);
//     return prev;
// }, {});

module.exports = {
    entry: path.resolve(__dirname,"../src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "bundle.js",
        publicPath: "/"
},
    resolve: {
        // alias: {
        //     _icons: path.resolve(__dirname, "../src/assets/icons"),
        //     _images: path.resolve(__dirname, "../src/assets/images"),
        //     _components: path.resolve(__dirname, "../src/components"),
        //     _pages: path.resolve(__dirname, "../src/pages"),
        //     _utils: path.resolve(__dirname, "../src/utils"),
        //     _services: path.resolve(__dirname, "../src/services"),
        // },
        extensions: ['.tsx', '.ts', '.js', '.json', '.jsx', '.svg']
    },

    devServer: {
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
            test: /\.ts(x?)$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        }
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|svg)$/i,
                type: "asset/inline"
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: "asset/inline"
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.DefinePlugin(envKeys),
    ]
};