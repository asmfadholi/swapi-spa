import Main from '@/views/Main'
import ListSwapi from '@/views/ListSwapi'

export default [

    {
        path: '/',
        name: 'Main',
        component: Main,
        redirect: 'home/list',
        children: [

            {
                path: '/home/list',
                name: 'ListSwapi',
                component: ListSwapi
            }

        ]
    }

]
