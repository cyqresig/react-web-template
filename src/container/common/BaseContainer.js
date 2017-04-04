/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component, PropTypes, cloneElement,} from 'react'
import AppWrapperComponent from '../../components/common/AppWrapperComponent'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Base extends Component {

    static defaultProps = {
        children: [],
        location: '',
    }

    static propTypes = {
        children: React.PropTypes.node,
        location: PropTypes.string,
    };

    shouldComponentUpdate() {
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {
            children,
            location,
        } = this.props

        return (
            <AppWrapperComponent>
                {cloneElement(children, {
                    key: location.pathname,
                })}
            </AppWrapperComponent>
        )
    }

}

export default Base
