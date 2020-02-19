import Vue from 'vue'
import Router from 'vue-router'
import ExampleRoute from './modules/ExampleRoute'

Vue.use(Router)

const modules = [
    ...ExampleRoute
]

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            redirect: '/'
        },
        ...modules
    ]
})