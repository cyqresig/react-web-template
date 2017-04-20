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
)
class TodoListContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {
            getTodoList,
        } = this.props
        getTodoList()
    }

    render() {
        const {
            todoList: {
               todos,
               fetching,
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
                { fetching ? <div>loading...<br/><br/><br/></div> : null }
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
