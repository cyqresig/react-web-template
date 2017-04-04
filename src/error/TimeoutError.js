/**
 * @fileoverview timeoutError
 * @since 2017-04-04 15:23
 * @author chenyiqin
 */

class TimeoutError extends Error {

    constructor(message = '请求超时') {
        super(message)
        this.name = 'timeout'
        this.message = message
        this.stack = (new Error()).stack
    }
}

export default TimeoutError
