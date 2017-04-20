/**
 * @since 2017-04-18 15:24
 * @author chenyiqin
 */

import React, {Component,} from 'react'
// import { bindActionCreators, } from 'redux'
import { connect, } from 'react-redux'

import * as action from '../action'
import './TodoInfoContainer.pcss'

@connect(
    state => ({
        todo: state.todo,
    }),
    action.todo,
    // state => ({
    //     todoList: state.todoList,
    //     todo: state.todo,
    // }),
    // dispatch => bindActionCreators(action.todo, dispatch)
)
class TodoContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        // const {todo,} = this.props

        return (
            <div className="todo">id: {this.props.router.params.id}</div>
        )
    }
}

export default TodoContainer
