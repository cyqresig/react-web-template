/**
 * @since 2017-04-04 18:38
 * @author chenyiqin
 */

import {render,} from 'react-dom'
import {Provider,} from 'react-redux'                   // eslint-disable-line no-unused-vars
import {HotLoaderContainer,} from 'react-hot-loader'    // eslint-disable-line no-unused-vars
import {Router, hashHistory,} from 'react-router'
import {syncHistoryWithStore,} from 'react-router-redux'
import React, {Component, Children, createElement,} from 'react' // eslint-disable-line no-unused-vars
import store from './store'
const ID_SELECTOR = 'main'
const history = syncHistoryWithStore(hashHistory, store)

// hack around https://github.com/gaearon/react-hot-boilerplate/pull/61#issuecomment-211504531
Router.prototype.componentWillReceiveProps = (nextProps) => {
    const components = []

    const grabComponents = (element) => {
        // This only works for JSX routes, adjust accordingly for plain JS config
        if (element.props && element.props.component) {
            components.push(element.props.component)
        }
        if (element.props && element.props.children) {
            Children.forEach(element.props.children, grabComponents)
        }
    }

    grabComponents(nextProps.routes || nextProps.children)
    components.forEach(createElement) // force patching
}

export default (routes) => {
    return render(
        <HotLoaderContainer>
            <Provider store={store}>
                <Router history={history} routes={routes}/>
            </Provider>
        </HotLoaderContainer>,
        document.getElementById(ID_SELECTOR)
    )
}
