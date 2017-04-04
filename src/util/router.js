/**
 * @fileoverview react-router配合redux的api封装
 * @since 2017-04-04 11:42
 * @author chenyiqin
 */

import { push, replace, go, goBack, goForward, } from 'react-router-redux'

export default {
    push: (location) => (dispatch) => dispatch(push(location)),
    replace: (location) => (dispatch) => dispatch(replace(location)),
    go: (number) => (dispatch) => dispatch(go(number)),
    goBack: () => (dispatch) => dispatch(goBack()),
    goForward: () => (dispatch) => dispatch(goForward()),
}

