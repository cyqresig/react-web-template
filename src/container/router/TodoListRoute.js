/**
 * @since 2017-04-20 11:30
 * @author chenyiqin
 */

import React from 'react'
import TodoListContainer from '../TodoListContainer'

const setRef = (component) => {
    if (component !== null) {
        console.log(`component.getWrappedInstance() = `, component.getWrappedInstance())    // eslint-disable-line
    }
}

const TodoListRouteContainer = (props) => {
    const {
        router,
    } = props

    return (
        <TodoListContainer ref={setRef} router={router}/>
    )
}

export default TodoListRouteContainer
