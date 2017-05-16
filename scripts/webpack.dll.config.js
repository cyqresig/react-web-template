/**
 * @since 2017-05-16 19:54
 * @author chenyiqin
 */

const RELEASE_PATH = `build`

const path = require("path");
const webpack = require("webpack");
module.exports = {
    resolve: {
        extensions: [".js"]
    },
    entry: {
        dll: [
            `babel-polyfill`,
            `whatwg-fetch`,
            `react`,
            `react-dom`,
            `redux`,
            `react-redux`,
            `react-router`,
            `react-router-redux`,
            `js-cookie`,
        ]
    },
    output: {
        path: path.join(__dirname, '..', RELEASE_PATH, 'js'),
        filename: "[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            `NODE_ENV`,
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '..', RELEASE_PATH, "[name]-manifest.json"),
            name: "[name]_[hash]"
        })
    ]
};
