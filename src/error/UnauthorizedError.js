/**
 * @fileoverview UnauthorizedError
 * @since 2017-04-04 15:26
 * @author chenyiqin
 */

class UnauthorizedError extends Error {
    constructor(message = '用户未登录') {
        super(message)
        this.name = 'unauthorized'
    }
}

export default UnauthorizedError

