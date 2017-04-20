/**
 * @since 2017-04-20 11:42
 * @author chenyiqin
 */


import React from 'react'
import BaseContainer from '../common/BaseContainer'

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
