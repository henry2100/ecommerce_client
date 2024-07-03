const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: "development",
    devServer: {
        hot:true,
        open: true,
        client: {
            progress: true,
        },
    },
    watchOptions: {
        poll: 1000,
    },
    devtool: "cheap-module-source-map",
    plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
            }),
            new ReactRefreshWebpackPlugin(),
    ],
}