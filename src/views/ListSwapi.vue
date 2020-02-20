<template>
  <div>
    <b-container fluid>

      <div class="d-flex justify-content-center mt-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="itemData.count"
          :per-page="10"
        ></b-pagination>
      </div>

      <b-row>
        <b-col v-for="(person, index) in itemData.list" :key="index" cols="12" sm="6" md="4" lg="3" class="p-3">
          <div class="card">
            <div class="p-2 d-flex justify-content-center">
              <h4>{{person.name}}</h4>
            </div>

            <b-button variant="info" @click="redirectToDetail(person.url)">
              Detail
            </b-button>
          </div>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-center mt-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="itemData.count"
          :per-page="10"
        ></b-pagination>
      </div>

    </b-container>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ListSwapi',
  data () {
    return {
      currentPage: 1,
      itemData: {
        list: [],
        count: 1
      }
    }
  },

  computed: {
    ...mapState('SwapiStore', ['swapiState'])
  },

  watch: {
    'swapiState.list' (newVal) {
      this.itemData.list = [...newVal.results]
      this.itemData.count = newVal.count
    },

    currentPage (newVal) {
      this.listPeople(Number(newVal))
    }
  },

  created () {
    this.listPeople(1)
  },

  methods: {
    listPeople (page) {
      this.$store.dispatch('SwapiStore/listPeople', { page })
    },

    redirectToDetail (url) {
      const splitUrl = url.split('/')
      const getId = splitUrl[splitUrl.length - 2]
      this.$router.replace('/home/list/detail/' + getId)
    }
  }

}
</script>
