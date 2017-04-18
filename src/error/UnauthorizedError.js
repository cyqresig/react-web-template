/**
 * @since 2016-06-05 11:40
 * @author vivaxy
 */

import * as errors from '../conf/errors'

export default class UnauthorizedError extends Error {
    constructor() {
        super(`用户未登录`)
        this.name = errors.UNAUTHORIZED
    }
}

UnauthorizedError.create = (timeout) => {
    return new UnauthorizedError(timeout)
}
