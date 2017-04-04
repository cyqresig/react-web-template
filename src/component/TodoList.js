/**
 * @since 2017-04-04 18:05
 * @author chenyiqin
 */

import React, {Component,} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Todo from './Todo'

class TodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            todoList: [],
        }
    }

    shouldComponentUpdate() {
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {todoList,} = this.state

        return todoList.map((todo) => {
            return (
                <Todo
                    key={todo.id}
                    todo={todo}/>
            )
        })
    }
}

export default TodoList
