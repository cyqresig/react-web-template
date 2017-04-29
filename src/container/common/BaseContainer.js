/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import './BaseContainer.pcss'
import React, {PropTypes, PureComponent, cloneElement,} from 'react'

class BaseContainer extends PureComponent {

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
