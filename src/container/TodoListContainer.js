/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component,} from 'react'
// import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'

import action from '../action'
import Todo from '../component/Todo'
import './TodoListContainer.pcss'

@connect(
    state => ({
        todoList: state.todoList,
    }),
    action.todo,
    // state => ({
    //     todoList: state.todoList,
    //     todo: state.todo,
    // }),
    // dispatch => bindActionCreators(action.todo, dispatch)

)
class TodoListContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        const {
            todoList: {
               todos,
            },
            removeTodo,
            router,
        } = this.props
        return (
            <div className="todo-list">
                {
                    todos.map((todo) => {
                        const {
                            id,
                            complete,
                            title,
                        } = todo
                        return (
                            <Todo
                                key={id}
                                id={id}
                                complete={complete}
                                title={title}
                                remove={removeTodo}
                                router={router}/>
                        )
                    })
                }
                <input type="button" className="button" onClick={this.handleAddTodoClick} value="新增任务"/>
            </div>
        )
    }

    handleAddTodoClick = () => {
        this.props.addTodo({
            id: 0,
            title: '新任务',
            complete: false,
        })
    }
}

export default TodoListContainer
