/**
 * @fileoverview request error
 * @since 2017-04-04 16:19
 * @author chenyiqin
 */

class RequestError extends Error {

    constructor(message) {
        super(message)
        this.name = 'request'
        this.message = message
        this.stack = (new Error()).stack
    }
}

export default RequestError
