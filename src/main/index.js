/**
 * @since 2017-04-04 18:36
 * @author chenyiqin
 */

import render from '../util/render'
import routes from '../routes'

render(routes)

if (module.hot) {
    module.hot.accept('../pages/index', () => {
        const newPage = require('../pages/index').default

        newPage()
    })
}
