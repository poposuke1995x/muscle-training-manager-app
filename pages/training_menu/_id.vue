<template>
  <div>
    <div v-for="liftType in liftTypes" :key="liftType.id">
      {{liftType}}
    <v-btn
      depressed
      color="primary"
    >update</v-btn>
      <v-card>
        <v-card-title>
          <nuxt-link :to="`/`">
            <span class="title font-weight-light">{{ liftType.name }}</span>
          </nuxt-link>
        </v-card-title>
        <v-card-text>
          <table>
            <tr>
              <th></th>
              <th>重量(kg)</th>
              <th>レップ数(Rep)</th>
              <th>セット数(回)</th>
            </tr>
            <tr>
              <th>標準的な重量</th>
              <td><input type="number" :value="liftType.defaultWeight" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.defaultRep" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.defaultSetCount" style=" width: 3em;"></td>
            </tr>
            <tr>
              <th>高重量</th>
              <td><input type="number" :value="liftType.heavyWeight" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.heavyRep" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.heavySetCount" style=" width: 3em;"></td>
            </tr>
            <tr>
              <th>低重量</th>
              <td><input type="number" :value="liftType.lightWeight" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.lightRep" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.lightSetCount" style=" width: 3em;"></td>
            </tr>
          </table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, route }) {
    return $axios.$get(`${route.path}/lift_types`).then(liftTypes => {
      return {liftTypes}
    })
  },
  data() {
    return {

    };
  },
  methods: {
    async update(liftTypes) {
      this.$axios.post();
    }
  },
  async created() {

  },
};
</script>
