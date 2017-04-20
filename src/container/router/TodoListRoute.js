/**
 * @since 2017-04-20 11:30
 * @author chenyiqin
 */

import React from 'react'
import TodoListContainer from '../TodoListContainer'

const TodoListRouteContainer = (props) => {
    const {
        router,
    } = props
    return (
        <TodoListContainer router={router}/>
    )
}

export default TodoListRouteContainer
