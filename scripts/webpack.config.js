/**
 * @since 2017-04-04 17:38
 * @author chenyiqin
 */

const fs = require(`fs`)
const path = require(`path`)
const webpack = require(`webpack`)
const HappyPack = require(`happypack`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const PostcssImport = require(`postcss-import`)
const precss = require(`precss`)
const cssnext = require(`postcss-cssnext`)
const numeral = require(`numeral`)
const logUpdate = require(`log-update`)
const ip = require(`ip`)
const DEVELOPMENT_IP = ip.address()
const DEVELOPMENT_PORT = `9090`
const SOURCE_PATH = `src`
const RELEASE_PATH = `build`
const DEVELOPMENT = `development`
const PRODUCTION = `production`
const NODE_MODULES = `node_modules`
const MOCK_FOLDER = `mock`
const MAIN_FOLDER = `main`
const VIEW_FOLDER = `view`
const COMMON_CHUNK_NAME = `common`
const NODE_ENV = process.env.NODE_ENV || PRODUCTION

// const jsRule = {
//     test: /\.js$/,
//     exclude: /node_modules/,
//     use: [
//         `babel-loader`,
//     ],
// }
//
// const cssRule = {
//     test: /\.css$/,
//     use: [
//         `style-loader`,
//         `css-loader`,
//     ],
// }
//
// const pcssRule = {
//     test: /\.pcss$/,
//     use: [
//         `style-loader`,
//         `css-loader`,
//         {
//             loader: `postcss-loader`,
//             options: {
//                 plugins: function () {
//                     return [
//                         PostcssImport(),
//                         precss(),
//                         cssnext(),
//                     ]
//                 },
//             },
//         },
//     ],
// }
//
// const lessRule = {
//     test: /\.less$/,
//     use: [
//         `style-loader`,
//         `css-loader`,
//         `less-loader`,
//     ],
// }
//
const fileRule = {
    test: /\.(png|jpg|gif)$/,
    use: [
        {
            loader: `url-loader`,
            options: {
                limit: 8192,
                name: `images/[name]-[hash].[ext]`,
            },
        },
    ],
}


// Ensure `postcss` key is extracted
HappyPack.SERIALIZABLE_OPTIONS = HappyPack.SERIALIZABLE_OPTIONS.concat(['postcss'])

const jsRule = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        `happypack/loader?id=js`,
    ],
}

const cssRule = {
    test: /\.css$/,
    use: [
        `happypack/loader?id=css`
    ],
}

const pcssRule = {
    test: /\.pcss$/,
    use: [
        `happypack/loader?id=pcss`
    ],
}

const lessRule = {
    test: /\.less$/,
    use: [
        `happypack/loader?id=less`
    ],
}

// const fileRule = {
//     test: /\.(png|jpg|gif)$/,
//     use: [
//         `happypack/loader?id=file`
//     ],
// }


const jsHappyPack = new HappyPack({
    id: 'js',
    loaders: [
        `babel-loader?cacheDirectory`,
    ],
})

const cssHappyPack = new HappyPack({
    id: 'css',
    loaders: [
        `style-loader`,
        `css-loader`,
    ],
})

const pcssHappyPack = new HappyPack({
    id: 'pcss',
    loaders: [
        `style-loader`,
        `css-loader`,
        `postcss-loader`,
        // {
        //     loader: `postcss-loader`,
        //     options: {
        //         plugins: function () {
        //             return [
        //                 PostcssImport(),
        //                 precss,
        //                 cssnext,
        //             ]
        //         },
        //     },
        // },
    ],
})


const lessHappyPack = new HappyPack({
    id: 'less',
    loaders: [
        `style-loader`,
        `css-loader`,
        `less-loader`,
    ],
})

// const fileHappyPack = new HappyPack({
//     id: 'file',
//     loaders: [
//         {
//             loader: `url-loader`,
//             options: {
//                 limit: 8192,
//                 name: `images/[name]-[hash].[ext]`,
//             },
//         },
//     ],
// })


// default webpack config
const webpackConfig = {
    entry: {
        [COMMON_CHUNK_NAME]: [
            `babel-polyfill`,
            `whatwg-fetch`,
            `react`,
            `react-dom`,
            `redux`,
            `react-redux`,
            `react-router`,
            `react-router-redux`,
            `js-cookie`,
        ],
    },
    output: {
        path: path.resolve(__dirname, RELEASE_PATH),
        filename: `js/[name].js`,
    },
    module: {
        rules: [
            jsRule,
            cssRule,
            lessRule,
            fileRule,
            pcssRule,
        ],
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            `NODE_ENV`,
        ]),
        new webpack.NamedModulesPlugin(),

        jsHappyPack,
        cssHappyPack,
        pcssHappyPack,
        lessHappyPack,
        // fileHappyPack,

        new webpack.DllReferencePlugin({
            manifest: require("../build/dll-manifest.json") // eslint-disable-line
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: COMMON_CHUNK_NAME,
            // pages rests in different folder levels
            filename: `js/[name].js`,
        }),
    ],
    resolve: {
        extensions: ['.web.js', '.js', '.json', '.jsx',],
    },
}

// get entry
const entryNameList = fs.readdirSync(path.join(SOURCE_PATH, MAIN_FOLDER)).map((filename) => {
    return path.basename(filename, `.js`)
})

// set entry
entryNameList.forEach((entryName) => {
    webpackConfig.entry[entryName] = [
        path.join(__dirname, `../${SOURCE_PATH}/${MAIN_FOLDER}/${entryName}.js`),
    ]

    const htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: `${SOURCE_PATH}/${VIEW_FOLDER}/index.html`,
        filename: `${VIEW_FOLDER}/${entryName}.html`,
        hash: true,
        inject: `body`,
        chunks: [
            COMMON_CHUNK_NAME,
            entryName,
        ],
    })

    webpackConfig.plugins.push(htmlWebpackPlugin)

})

// set config according to environment
switch (NODE_ENV) {
    case DEVELOPMENT:

        // support react-hot-loader@3, @see https://github.com/gaearon/react-hot-loader/tree/next-docs
        jsRule.use.push(`react-hot-loader/webpack`)

        entryNameList.forEach((entryName) => {

            webpackConfig.entry[entryName].unshift(`webpack-dev-server/client?http://${DEVELOPMENT_IP}:${DEVELOPMENT_PORT}`)
            webpackConfig.entry[entryName].unshift(`webpack/hot/log-apply-result`)

            // hot reload
            // webpackConfig.entry[entryName].unshift(`webpack/hot/dev-server`)
            webpackConfig.entry[entryName].unshift(`webpack/hot/only-dev-server`)
            webpackConfig.entry[entryName].unshift(`react-hot-loader/patch`)
        })

        webpackConfig.devtool = `eval`
        webpackConfig.output.publicPath = `/`

        webpackConfig.devServer = {
            contentBase: [
                RELEASE_PATH,
            ],
            hot: true,
            historyApiFallback: true,
            host: DEVELOPMENT_IP,
            port: DEVELOPMENT_PORT,
            stats: {
                colors: true,
                verbose: true,
            },
            //open: true,
            open: false,
        }

        webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
        webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())
        webpackConfig.plugins.push(new webpack.ProgressPlugin((percentage, msg) => {
            logUpdate(`     progress:`, numeral(percentage).format(`00.00%`), msg)
        }))
        break
    default:
        webpackConfig.devtool = `source-map`
        webpackConfig.output.publicPath = `./`
        break
}

module.exports = webpackConfig
