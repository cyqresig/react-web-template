/**
 * @fileoverview action todo
 * @since 2017-04-04 16:51
 * @author chenyiqin
 */

import * as actionType from '../constant/action-type'

export default {
    getTodoList: data => {
        return dispatch => {
            dispatch({
                data,
                type: actionType.GET_TODO_LIST,
            })
        }
    },
    getTodo: data => {
        return dispatch => {
            dispatch({
                data,
                type: actionType.GET_TODO,
            })
        }
    },
    addTodo: data => {
        return dispatch => {
            dispatch({
                data,
                type: actionType.ADD_TODO,
            })
        }
    },
    editTodo: data => {
        return dispatch => {
            dispatch({
                data,
                type: actionType.EDIT_TODO,
            })
        }
    },
    removeTodo: data => {
        return dispatch => {
            dispatch({
                data,
                type: actionType.REMOVE_TODO,
            })
        }
    },
}
