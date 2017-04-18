/**
 * @since 2017-04-04 18:53
 * @author chenyiqin
 */


import BaseContainer from '../container/common/BaseContainer'
import NoMatchContainer from '../container/common/NoMatchContainer'
import TodoInfoContainer from '../container/TodoInfoContainer'
import TodoListContainer from '../container/TodoListContainer'

const noMatchRoute = {
    path: '*',
    component: NoMatchContainer,
}
const TodoListRoute = {
    path: 'todo-list',
    component: TodoListContainer,
}
const TodoInfoRoute = {
    path: 'todo(/:id)',
    component: TodoInfoContainer,
}

const route = {
    path: '/',
    component: BaseContainer,
    indexRoute: {
        component: TodoListContainer,
    },
    childRoutes: [
        TodoListRoute,
        TodoInfoRoute,
        noMatchRoute,
    ],
}

export default route
