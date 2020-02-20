<template>
  <div class="list-swapi">
    <b-container fluid class="mt-5">

      <h4 class="text-center">
        Search name here:
      </h4>

      <div class="d-flex justify-content-center mt-3">
        <v-select
          v-model="search_query"
          @search="fetchOptions"
          :options="options"
          :create-option="name => ({ name })"
          taggable
          label="name"
          class="select-search">
          <div slot="no-options">Please type your keyword...</div>
        </v-select>
        <b-button variant="info" class="info-search" @click="searchPeople">Search</b-button>
      </div>

      <div class="d-flex justify-content-center mt-3">
        <b-pagination
          v-model="currentPage"
          :total-rows="itemData.count"
          :per-page="10"
        ></b-pagination>
      </div>

      <div>
        <div v-if="!loading">
          <b-row>
            <b-col v-for="(person, index) in itemData.list" :key="index" cols="12" sm="6" md="4" lg="3" class="p-3">
              <div class="card">
                <div class="p-2 d-flex justify-content-center">
                  <b-icon icon="person-fill" class="h1" variant="default"></b-icon>
                </div>

                <div class="p-2 d-flex justify-content-center">
                  <h4>{{person.name}}</h4>
                </div>

                <b-button variant="info" @click="redirectToDetail(person.url)">
                  Detail
                </b-button>
              </div>
            </b-col>
          </b-row>
          <div v-if="itemData.list.length < 1">

            <div class="text-center">
               Data is not found
            </div>

          </div>
        </div>

        <b-row v-else>
          <b-col cols="12" sm="6" md="4" lg="3" v-for="(val, index) in 10" :key="index" class="p-3">
            <div class="card loading">
            </div>
          </b-col>
        </b-row>
      </div>

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
import _ from 'lodash'

export default {
  name: 'ListSwapi',
  data () {
    return {
      search_query: '',
      options: [],
      loading: false,
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
      this.loading = false
    },

    currentPage (newVal) {
      this.listPeople(Number(newVal))
      this.loading = true
    }
  },

  created () {
    this.loading = true
    this.listPeople(1)
  },

  methods: {
    listPeople: _.debounce(function (page) {
      this.$store.dispatch('SwapiStore/listPeople', { page })
    }, 200),

    searchPeople () {
      this.loading = true
      this.$store.dispatch('SwapiStore/searchPeople', { query: this.search_query ? this.search_query.name : '', type: 'search' })
    },

    redirectToDetail (url) {
      const splitUrl = url.split('/')
      const getId = splitUrl[splitUrl.length - 2]
      this.$router.replace('/home/list/detail/' + getId)
    },

    fetchOptions: _.debounce(async function (search, loading) {
      try {
        loading(true)
        const res = await this.$store.dispatch('SwapiStore/searchPeople', { query: search, type: 'fetch' })
        this.options = res.data.results
        loading(false)
      } catch (err) {
        throw err
      }
    }, 200)
  }

}
</script>
