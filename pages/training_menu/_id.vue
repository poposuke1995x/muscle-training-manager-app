<template>
  <div>
    <div v-for="liftType in liftTypes" :key="liftType.id">
      {{liftType}}
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
              <td><input type="number" :value="liftType.defaultWeight" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.defaultRep" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.defaultSetCount" style=" width: 3em;"></td>
            </tr>
            <tr>
              <th>低重量</th>
              <td><input type="number" :value="liftType.defaultWeight" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.defaultRep" style=" width: 3em;"></td>
              <td><input type="number" :value="liftType.defaultSetCount" style=" width: 3em;"></td>
            </tr>
          </table>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const response = await $axios;
    return { response };
  },
  data() {
    return {
      liftTypes: [],
    };
  },
  async created() {
    this.liftTypes = await this.$axios.$get(`${this.$route.path}/lift_types`);
    console.log(this.liftTypes);
  },
};
</script>
