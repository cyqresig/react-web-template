/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component, PropTypes,} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect,} from 'react-redux'

class NoMatchContainer extends Component {

    static propTypes = {
        location: PropTypes.string,
        params: React.PropTypes.object,
    };

    shouldComponentUpdate() {
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {
            params,
            location,
        } = this.props

        return (
            <div>
                {JSON.stringify(params)}
                {JSON.stringify(location)}
            </div>
        )
    }
}

export default connect(
    null,
    null)(NoMatchContainer)
