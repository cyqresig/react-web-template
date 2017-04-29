/**
 * @fileoverview server error
 * @since 2017-04-04 16:19
 * @author chenyiqin
 */

class ServerError extends Error {

    constructor(message) {
        super(message)
        this.name = 'server'
        this.message = message
        this.stack = (new Error()).stack
    }
}

export default ServerError
