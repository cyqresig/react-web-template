/**
 * @since 2017-04-17 22:52
 * @author chenyiqin
 */

import '../reducers/index'
import { applyMiddleware, combineReducers, compose, createStore, } from 'redux'
import { hashHistory, } from 'react-router'
import reducers from '../reducers'
import { routerMiddleware, } from 'react-router-redux'
import thunk from 'redux-thunk'

const routing = routerMiddleware(hashHistory)

const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(thunk, routing),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
        const nextRootReducer = require('../reducers/index').default

        store.replaceReducer(combineReducers(nextRootReducer))
    })
}

export default store
