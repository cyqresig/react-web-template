/**
 * @since 2017-04-20 11:42
 * @author chenyiqin
 */

import BaseContainer from '../common/BaseContainer'
import React from 'react'

const BaseRouteContainer = (props) => {
    const {
        router,
        children,
        location,
    } = props

    return (
        <BaseContainer router={router} location={location}>
            {children}
        </BaseContainer>
    )
}

export default BaseRouteContainer
