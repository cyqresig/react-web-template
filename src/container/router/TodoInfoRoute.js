/**
 * @since 2017-04-20 11:40
 * @author chenyiqin
 */

import React from 'react'
import TodoInfoContainer from '../TodoInfoContainer'

const TodoInfoRouteContainer = (props) => {
    const {
        router,
    } = props

    return (
        <TodoInfoContainer router={router}/>
    )
}

export default TodoInfoRouteContainer
