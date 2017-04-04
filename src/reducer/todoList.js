/**
 * @since 2017-04-04 17:38
 * @author chenyiqin
 */

import createReducer from '../util/createReducer'
import * as actionType from '../constant/action-type'

const initialState = {
    todos: [],
    added: 0,
    edited: 0,
    removed: 0,
}

export default createReducer(initialState, {
    [actionType.GET_TODO_LIST]: (state, action) => {
        return {
            ...state,
            todos: action.data.todos,
        }
    },
    [actionType.ADD_TODO]: (state, action) => {
        return {
            ...state,
            todos: [...state.todos, action.data.todo,],
        }
    },
    [actionType.REMOVE_TODO]: (state, action) => {
        return {
            ...state,
            todos: state.todos.filter(todo => todo.index === action.data.todo.index),
        }
    },
})
