/**
 * @since 2017-05-16 17:55
 * @author chenyiqin
 */

const PostcssImport = require(`postcss-import`)
const precss = require(`precss`)
const cssnext = require(`postcss-cssnext`)

module.exports = {
    plugins: [
        PostcssImport(),
        precss(),
        cssnext(),
    ]
}

// "browserslist": [
//     "> 1%"
// ],
