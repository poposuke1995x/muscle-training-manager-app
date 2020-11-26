<template>
  <div>
    <v-container v-if="!liftTypes.length">
      <nuxt-link :to="'/lift_types'">
        種目を追加しましょう
      </nuxt-link>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col><h3>
          {{ trainingMenu.name }}
        </h3></v-col>
        <v-col>
          <v-btn
            @click="update"
            depressed
            color="primary"
            class="button"
          >更新
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <div
          v-for="liftType in liftTypes"
          :key="liftType.id"
        >
          <v-col>
            <v-card
              class="card"
              width="600"
              shaped
              elevation="15"
            >
              <v-container>
                <v-card-title>{{ liftType.name }}
                  <pre>  </pre>
                  <v-btn
                    @click="goMovie(liftType.referenceUrl)"
                    v-show="liftType.referenceUrl"
                  >参考動画を視聴
                  </v-btn>
                </v-card-title>
                <v-row>
                  <v-col cols="4">
                    <v-card-text>
                      <h5>説明</h5>
                      {{ liftType.description || "説明がありません" }}
                    </v-card-text>
                  </v-col>
                  <v-col>
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
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.defaultWeight"
                              @change="liftType.defaultWeight = parseInt(liftType.defaultWeight)"
                              style=" width: 3em;"
                            >
                          </label></td>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.defaultRep"
                              @change="liftType.defaultRep = parseInt(liftType.defaultRep)"
                              style=" width: 3em;"
                            >
                          </label></td>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.defaultSetCount"
                              @change="liftType.defaultSetCount = parseInt(liftType.defaultSetCount)"
                              style=" width: 3em;"
                            >
                          </label></td>
                        </tr>
                        <tr>
                          <th>高重量</th>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.heavyWeight"
                              @change="liftType.heavyWeight = parseInt(liftType.heavyWeight)"
                              style=" width: 3em;"
                            >
                          </label></td>
                          <td><input
                            type="number"
                            min="0"
                            v-model="liftType.heavyRep"
                            @change="liftType.heavyRep = parseInt(liftType.heavyRep)"
                            style=" width: 3em;"
                          ></td>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.heavySetCount"
                              @change="liftType.heavySetCount = parseInt(liftType.heavySetCount)"
                              style=" width: 3em;"
                            >
                          </label></td>
                        </tr>
                        <tr>
                          <th>低重量</th>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.lightWeight"
                              @change="liftType.lightWeight = parseInt(liftType.lightWeight)"
                              style=" width: 3em;"
                            >
                          </label></td>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.lightRep"
                              @change="liftType.lightRep = parseInt(liftType.lightRep)"
                              style=" width: 3em;"
                            >
                          </label></td>
                          <td><label>
                            <input
                              type="number"
                              min="0"
                              v-model="liftType.lightSetCount"
                              @change="liftType.lightSetCount = parseInt(liftType.lightSetCount)"
                              style=" width: 3em;"
                            >
                          </label></td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const trainingMenu = await $axios.get("training_menu").then(response => {
      return response.data
        //あとで自分のメニューのみ返すようにする
        .filter(menu => menu.id === parseInt(route.params.id))
        [0];
    });
    const liftTypes = await $axios.$get(`${route.path}/lift_types`);

    return {trainingMenu, liftTypes}
  },
  data() {
    return {
      result: []
    };
  },
  methods: {
    async update() {
      this.liftTypes.forEach(liftType => liftType.trainingMenuId = parseInt(this.$route.params.id))
      await this.$axios.put(`${this.$route.path}/actions`, this.liftTypes)
    },
    goMovie(url) {
      window.open(url)
    }
  },
};
</script>

<style lang="sass">
.input
  border: 1px solid black

.card
  margin-bottom: 20px

</style>
