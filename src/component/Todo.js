/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component, PropTypes,} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Todo extends Component {

    static defaultProps = {
        complete: false,
        id: 0,
        title: '',
    }

    static propTypes = {
        complete: PropTypes.bool,
        id: PropTypes.number,
        title: PropTypes.string,
    }

    constructor(props) {
        super(props)
        this.state = {
            complete: props.complete,
            id: props.id,
            title: props.title,
        }
    }

    shouldComponentUpdate() {
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const { complete, id, title, } = this.state

        return (
            <div>
                <span>标题：{title}</span>
                <span>id: {id}</span>
                <span>{complete ? '已完成' : '未完成'}</span>
            </div>
        )
    }
}

export default Todo
