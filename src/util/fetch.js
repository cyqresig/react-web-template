/**
 * @since 2017-04-04 12:08
 * @author chenyiqin
 */
import 'whatwg-fetch'
import * as envType from '../constant/node-env-type'
import { DEFAULT_TIMEOUT, METHOD, } from '../constant/request'
import { RequestError, ServerError, TimeoutError, UnauthorizedError, } from '../error'
import { MOCK_SERVER_DELAY, } from '../constant/server'
import nodeEnv from '../constant/node-env'
import url from 'url'

if (nodeEnv === envType.DEVELOPMENT) {
    require('../../mock')
}

const SERVER_SUCCESS_CODE = 200
const UNAUTHORIZED_CODE = 401

const basicFormOptions = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
}
const credentialOptions = {
    credentials: 'include',
}

const timeoutSimulation = async (timeout) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}

const timeoutPromise = async (timeout) => {
    await timeoutSimulation(timeout)
    throw new TimeoutError()
}

const request = async (options) => {
    if (nodeEnv === envType.DEVELOPMENT) {
        await timeoutSimulation(MOCK_SERVER_DELAY)
    }

    const {
        method = METHOD.GET,
        data,
    } = options

    let {
        url: requestPath,
    } = options

    let response = null

    switch (method.toLowerCase()) {
        case METHOD.GET:
            requestPath = url.format({
                pathname: requestPath,
                query: data,
            })
            response = await fetch(requestPath, {
                ...credentialOptions,
            })
            break
        case METHOD.POST:
            response = await fetch(requestPath, {
                ...basicFormOptions,
                ...credentialOptions,
                method,
                body: data,
            })
            break
        default:
    }

    return response
}

export default async (options) => {
    const {
        timeout = DEFAULT_TIMEOUT,
        ...fetchOptions
    } = options
    const response = await Promise.race([timeoutPromise(timeout), request(fetchOptions),])

    if (response.status === UNAUTHORIZED_CODE) {
        throw new UnauthorizedError(response)
    } else if (response.status !== SERVER_SUCCESS_CODE) {
        throw new RequestError()
    } else {
        const res = await response.json()

        if (res.code !== SERVER_SUCCESS_CODE) {
            throw new ServerError(res)
        } else {
            return res.data
        }
    }
}
