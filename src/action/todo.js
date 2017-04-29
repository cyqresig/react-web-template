/**
 * @fileoverview action todo
 * @since 2017-04-04 16:51
 * @author chenyiqin
 */

import * as actionType from '../constant/action-type'
import * as todoApi from '../api/todo'

export const fetchingTodoList = (fetching) => ({
    type: actionType.FETCHING_TODO_LIST,
    fetching,
})

export const receiveTodoList = (todos) => ({
    type: actionType.GET_TODO_LIST,
    todos,
})

export const getTodoList = () => {
    return async (dispatch) => {
        dispatch(fetchingTodoList(true))
        try {
            const json = await todoApi.getTodoList()

            dispatch(receiveTodoList(json))
        } catch (ex) {
            console.log(`ex = `, ex)    // eslint-disable-line
        } finally {
            dispatch(fetchingTodoList(false))
        }
    }
}

export const addTodo = () => ({
    type: actionType.ADD_TODO,
    todo: {
        id: 0,
        title: '新任务',
        complete: false,
    },
})

export const removeTodo = (id) => ({
    type: actionType.REMOVE_TODO,
    id,
})
