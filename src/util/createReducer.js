/**
 * @since 2017-04-04 17:40
 * @author chenyiqin
 */

export default (initialState, handlers) => {
    return (state = initialState, action) => {
        return handlers[action.type] ? handlers[action.type](state, action) : state
    }
}
