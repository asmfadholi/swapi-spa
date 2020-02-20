import Api from '@/services'

export default {
    namespaced: true,

    state: {
        swapiState: {
            detail: null,
            list: null
        }
    },

    getters: {

    },

    mutations: {
        storeData(state, payload) {
            state.swapiState[payload.state] = payload.data
        }

    },

    actions: {
        async listPeople({ commit }, req) {
            try {
                const res = await Api.listPeople(req)
                res.state = 'list'
                commit('storeData', res)
            } catch (e) {
                throw e
            }
        },

        async detailPeople({ commit }, req) {
            try {
                const res = await Api.detailPeople(req)
                res.state = 'detail'
                commit('storeData', res)
            } catch (e) {
                throw e
            }
        }

    }

}