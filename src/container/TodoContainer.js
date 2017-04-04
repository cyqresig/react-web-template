/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component,} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Todo from '../component/Todo'

class TodoContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    shouldComponentUpdate() {
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <Todo/>
        )
    }
}

export default TodoContainer
