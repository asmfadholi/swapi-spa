<template>
  <div>
    <b-modal
      size="lg"
      :hideFooter="true"
      @hidden="hideToRedirect"
      ref="modalParent">
      <b-container v-if='itemData.detail'>

        <div class="flex justify-content-center">
          <h4>{{itemData.detail.name}}</h4>
        </div>

        <div class="card mt-4 p-3">
          <b-row v-for="(val, index) in itemData.detail" :key="index">
            <b-col cols="6" sm="5" md="4" lg="3">
              {{ index }}
            </b-col>
            <b-col cols="6">
              : {{ val }}
            </b-col>
          </b-row>
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
      itemData: {
        detail: {

          name: '-',
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

        name: newVal.name,
        Height: newVal.height,
        Mass: newVal.mass,
        'Hair Color': newVal.hair_color,
        'Skin Color': newVal.skin_color,
        'Eye Color': newVal.eye_color,
        'Birth Year': newVal.birth_year,
        Gender: newVal.gender

      }
    }
  },
  mounted () {
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
