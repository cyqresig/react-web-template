/**
 * @since 2017-04-04 12:08
 * @author chenyiqin
 */

import url from 'url'
import fetch from 'isomorphic-fetch'
import {TimeoutError, RequestError, ServerError,} from '../error'
import {DEFAULT_TIMEOUT, METHOD,} from '../constant/request'
import {MOCK_SERVER_DELAY,} from '../constant/server'
import * as envType from '../constant/node-env-type'
import nodeEnv from '../constant/node-env'

const requestSuccessCode = 200
const serverSuccessCode = 0

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

    if (nodeEnv === envType.DEVELOPMENT) {
        timeoutSimulation(MOCK_SERVER_DELAY)
    }

    return response
}

export default async (options) => {
    const {
        timeout = DEFAULT_TIMEOUT,
        ...fetchOptions
    } = options

    const response = await Promise.race([timeoutPromise(timeout), request(fetchOptions),])

    if (response.status !== requestSuccessCode) {
        throw new RequestError()
    } else {
        const res = response.json()
        if (res.code < serverSuccessCode) {
            throw new ServerError()
        } else {
            return res.data
        }
    }
}
