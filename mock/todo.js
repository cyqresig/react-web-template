/**
 * @since 2017-04-18 17:58
 * @author chenyiqin
 */

import * as server from '../src/constant/server'
import fetchMock from 'fetch-mock'
import getTodoListJson from './json/getTodoList.json'

export const getTodosMock = fetchMock.mock(new RegExp(`/${server.GET_TODO_LIST_METHOD}`), (url, opts) => {
    console.log(`fetchMock url, opts = `, url, opts)    // eslint-disable-line

    return new Promise((resolve,) => {
        const result = getTodoListJson

        resolve(JSON.stringify(result))
    })
})
