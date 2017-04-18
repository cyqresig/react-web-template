/**
 * @since 2017-04-17 21:20
 * @author chenyiqin
 */

import open from 'open'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfigDev from '../webpack.config'

const devServerConfig = Object.assign({}, webpackConfigDev.devServer)
const compiler = webpack(webpackConfigDev)
const server = new WebpackDevServer(compiler, devServerConfig)
let browserOpened = false

const openBrowser = () => {
    const appAddress = server.listeningApp.address()
    const url = `http://${appAddress.address}:${appAddress.port}`
    console.log(`   server is starting: ${url}`)
    open(`${url}/view/index.html`)
}

compiler.plugin('done', () => {
    if (!browserOpened) {
        browserOpened = true
        openBrowser()
    }
})

const startServerPromise = new Promise((resolve, reject) => {
    server.listen(devServerConfig.port, devServerConfig.host, (err) => {
        if (err) {
            reject(err)
        } else {
            resolve()
        }
    })
})

const devServer = async () => {
    await startServerPromise
    const stdIn = process.stdin
    stdIn.setEncoding('utf8')
    stdIn.on('data', openBrowser)
}

devServer().catch((ex) => {
    console.error(ex)
})
