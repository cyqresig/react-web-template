/**
 * @since 2017-04-04 18:04
 * @author chenyiqin
 */

import React from 'react'

const NoMatch = (props) => {
    const {
        params,
        location,
    } = props

    return (
        <div>
            没有匹配到的路由，参数如下：<br/>
            {JSON.stringify(params)}<br/>
            {JSON.stringify(location)}
        </div>
    )
}

export default NoMatch
