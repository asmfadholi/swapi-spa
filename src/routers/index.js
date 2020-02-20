import Vue from 'vue'
import Router from 'vue-router'
import SwapiRoute from './modules/SwapiRoute'

Vue.use(Router)

const modules = [
    ...SwapiRoute
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
