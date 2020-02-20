export default {
    listPeople(req) {
        const api = this.generateApi()
        return api.get('people?page=' + req.page).then(res => res)
    },

    detailPeople(req) {
        const api = this.generateApi()
        return api.get('people/' + req.id).then(res => res)
    }

}
