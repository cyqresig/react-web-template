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
    addTodo: () => ({
        type: actionType.ADD_TODO,
        todo: {
            id: 0,
            title: '新任务',
            complete: false,
        },
    }),

    editTodo: data => {
        return dispatch => {
            dispatch({
                data,
                type: actionType.EDIT_TODO,
            })
        }
    },
    removeTodo: (id) => ({
        type: actionType.REMOVE_TODO,
        id,
    }),
}
