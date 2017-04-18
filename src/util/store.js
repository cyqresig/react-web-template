/**
 * @since 2017-04-17 22:52
 * @author chenyiqin
 */

import { createStore, combineReducers, compose, applyMiddleware, } from 'redux'
import { routerMiddleware, } from 'react-router-redux'
import { hashHistory, } from 'react-router'
import thunk from 'redux-thunk'

import reducers from '../reducers'

const routing = routerMiddleware(hashHistory)

const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(thunk, routing),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default
        store.replaceReducer(combineReducers(nextRootReducer))
    })
}

export default store
