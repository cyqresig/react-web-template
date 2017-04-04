/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component,} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import TodoList from '../component/TodoList'

class TodoListContainer extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    shouldComponentUpdate() {
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {todoList,} = this.props

        return (
            <TodoList
                todoList={todoList}/>
        )
    }
}

export default TodoListContainer
