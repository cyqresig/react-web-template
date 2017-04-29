/**
 * @since 2017-04-04 17:38
 * @author chenyiqin
 */

import * as actionType from '../constant/action-type'
import createReducer from '../util/createReducer'

const initialState = {
    todos: [],
    added: 0,
    edited: 0,
    removed: 0,
    fetching: false,
}

export default createReducer(initialState, {
    [actionType.FETCHING_TODO_LIST]: (state, action) => {
        return {
            ...state,
            fetching: action.fetching,
        }
    },
    [actionType.GET_TODO_LIST]: (state, action) => {
        return {
            ...state,
            todos: action.todos,
        }
    },
    [actionType.ADD_TODO]: (state) => {
        return {
            ...state,
            todos: [...state.todos, {
                id: state.todos.length === 0 ? 1 : state.todos.reduce((lastTodo, todo) => {
                    let nextTodo = null

                    if (lastTodo && lastTodo.id > todo.id) {
                        nextTodo = lastTodo
                    } else {
                        nextTodo = todo
                    }

                    return nextTodo
                }).id + 1,
                title: '新任务',
                complete: false,
            },],
            added: state.added + 1,
        }
    },
    [actionType.REMOVE_TODO]: (state, action) => {
        return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.id),
            removed: state.removed + 1,
        }
    },
})
