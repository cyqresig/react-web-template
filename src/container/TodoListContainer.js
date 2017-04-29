/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import './TodoListContainer.pcss'
import React, { Component, } from 'react'
import Todo from '../component/Todo'
import action from '../action'
// import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'

@connect(
    state => ({
        todoList: state.todoList,
    }),
    action.todo,
    (stateProps, dispatchProps, ownProps) => {
        return {
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        }
    },
    {
        pure: true,
        withRef: true,
    }
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

    handleAddTodoClick = () => {
        this.props.addTodo({
            id: 0,
            title: '新任务',
            complete: false,
        })
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

        console.log(`todos.length = `, todos.length)    // eslint-disable-line

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
                                // key={index}
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
}

export default TodoListContainer
