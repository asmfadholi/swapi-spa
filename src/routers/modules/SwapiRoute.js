import Main from '@/views/Main'
import ListSwapi from '@/views/ListSwapi'
import DetailSwapi from '@/views/DetailSwapi'

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
                component: ListSwapi,
                children: [

                    {
                        path: '/home/list/detail/:id',
                        name: 'DetailSwapi',
                        component: DetailSwapi
                    }

                ]
            }

        ]
    }

]