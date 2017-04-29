/**
 * @since 2017-04-04 18:36
 * @author chenyiqin
 */

import renderPage from '../pages/index'

renderPage()

if (module.hot) {
    module.hot.accept('../pages/index', () => {
        const renderNewPage = require('../pages/index').default

        renderNewPage()
    })
}
