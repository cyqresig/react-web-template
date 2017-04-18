/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React, {Component, PropTypes, cloneElement,} from 'react'
import './BaseContainer.pcss'

class BaseContainer extends Component {

    static defaultProps = {
        children: [],
        location: '',
    }

    static propTypes = {
        children: React.PropTypes.node,
        location: PropTypes.object,
    };

    render() {
        const {
            children,
            location,
        } = this.props

        return (
            <div className="base">
                <header>
                    React Webpack Template
                </header>
                <div className="content">
                    {cloneElement(children, {
                        key: location.pathname,
                    })}
                </div>
                <footer>
                    copyright
                </footer>
            </div>
        )
    }

}

export default BaseContainer
