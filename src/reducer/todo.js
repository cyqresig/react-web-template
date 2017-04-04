/**
 * @since 2017-04-04 17:38
 * @author chenyiqin
 */

import * as actionType from '../constant/action-type'
import createReducer from '../util/createReducer'

const initialState = {
    complete: false,
    id: 0,
    title: '',
}

export default createReducer(initialState, {
    [actionType.GET_TODO]: (state, action) => {
        return {
            ...action.data,
        }
    },
})
