<template>
  <div>
    <b-modal
      size="lg"
      :hideFooter="true"
      @hidden="hideToRedirect"
      ref="modalParent">
      <b-container>

        <div v-if="!loading" class="detail-swapi">
          <div class="flex justify-content-center">
            <h4>
              <b-icon icon="person-fill" class="h4" variant="default"></b-icon>
              {{itemData.detail.Name}}
            </h4>
          </div>

          <div class="card mt-4 p-3">
            <b-row v-for="(val, index) in itemData.detail" :key="index">
              <b-col cols="5" sm="5" md="4" lg="3">
                {{ index }}
              </b-col>
              <b-col>
                : {{ val }}
              </b-col>
            </b-row>
          </div>
        </div>

        <div v-else class="detail-swapi">
          <div class="flex justify-content-center">
            <h4 class="loading name"></h4>
          </div>

          <div class="card mt-4 p-3">
            <b-row v-for="(val, index) in itemData.detail" :key="index">
              <b-col cols="5" sm="5" md="4" lg="3">
                <div class="loading"></div>
              </b-col>
              <b-col>
                <div class="loading"></div>
              </b-col>
            </b-row>
          </div>
        </div>

      </b-container>

    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonDetail',
  data () {
    return {
      loading: false,
      itemData: {
        detail: {

          Name: '-',
          Height: '-',
          Mass: '-',
          'Hair Color': '-',
          'Skin Color': '-',
          'Eye Color': '-',
          'Birth Year': '-',
          Gender: '-'
        }
      }
    }
  },
  computed: {
    ...mapState('SwapiStore', ['swapiState'])
  },
  watch: {
    'swapiState.detail' (newVal) {
      this.itemData.detail = {

        Name: newVal.name,
        Height: newVal.height,
        Mass: newVal.mass,
        'Hair Color': newVal.hair_color,
        'Skin Color': newVal.skin_color,
        'Eye Color': newVal.eye_color,
        'Birth Year': newVal.birth_year,
        Gender: newVal.gender

      }
      this.loading = false
    }
  },
  mounted () {
    this.loading = true
    this.$refs.modalParent.show()
    this.$store.dispatch('SwapiStore/detailPeople', { id: this.$route.params.id })
  },
  methods: {
    hideToRedirect () {
      this.$router.replace(this.$route.matched[1].path)
    }
  }

}
</script>
