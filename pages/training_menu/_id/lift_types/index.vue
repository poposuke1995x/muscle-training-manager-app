<template>
  <div>
    <h3>
      {{ trainingMenu.name }}
    </h3>
    <div
      v-for="error in errors"
      :key="error.index"
    >
      <span style="color: #ff0000;">
        {{ error }}
      </span>
    </div>
    <v-container>
      <div>
        <v-row>
          <v-col>
            <v-row>
              <v-container>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="request.id"
                      :items="liftTypes"
                      item-value="id"
                      item-text="name"
                      clearable
                      label="種目を選択"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="request.targetBodyPartIds"
                      multiple
                      :items="bodyParts"
                      item-value="id"
                      item-text="name"
                      clearable
                      label="狙う部位を選択"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="request.isMain"
                      :items="bodyParts.filter(bodyPart => request.targetBodyPartIds.includes(bodyPart.id))"
                      item-value="id"
                      item-text="name"
                      no-data-text="狙う部位を選択してください"
                      clearable
                      label="メイン部位を選択"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-row>
            <v-row>
              <v-col>
                <table>
                  <tr>
                    <th></th>
                    <th>重量(kg)</th>
                    <th>レップ数(Rep)</th>
                    <th>セット数(回)</th>
                  </tr>
                  <tr>
                    <th>高重量</th>
                    <td><label>
                      <input
                        type="number"
                        min="0"
                        v-model="request.heavyWeight"
                        style=" width: 3em;"
                        @change="request.heavyWeight = parseInt(request.heavyWeight)"
                      >
                    </label></td>
                    <td><label>
                      <input
                        type="number"
                        min="0"
                        v-model="request.heavyRep"
                        style=" width: 3em;"
                        @change="request.heavyRep = parseInt(request.heavyRep)"
                      >
                    </label></td>
                    <td><label>
                      <input
                        type="number"
                        min="0"
                        v-model="request.heavySetCount"
                        style=" width: 3em;"
                        @change="request.heavySetCount = parseInt(request.heavySetCount)"
                      >
                    </label></td>
                  </tr>
                  <tr>
                    <th>低重量</th>
                    <td><label>
                      <input
                        type="number"
                        min="0"
                        v-model="request.lightWeight"
                        style=" width: 3em;"
                        @change="request.lightWeight = parseInt(request.lightWeight)"

                      >
                    </label></td>
                    <td><label>
                      <input
                        type="number"
                        min="0"
                        v-model="request.lightRep"
                        style=" width: 3em;"
                        @change="request.lightRep = parseInt(request.lightRep)"
                      >
                    </label></td>
                    <td><label>
                      <input
                        type="number"
                        min="0"
                        v-model="request.lightSetCount"
                        style=" width: 3em;"
                        @change="request.lightSetCount = parseInt(request.lightSetCount)"
                      >
                    </label></td>
                  </tr>
                </table>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  depressed
                  color="primary"
                  @click="registerLiftTypes()"
                  class="button"
                >登録
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-container>
              <nuxt-link :to="'/lift_types'">種目の作成</nuxt-link>
            </v-container>
            <v-container>
              <v-row>
                <v-col>
                  <v-btn
                    @click="deleteLiftTypes()"
                    v-if="menuLiftTypes.length"
                  >チェックした項目をメニューから削除
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <div
                  v-for="menuLiftType in menuLiftTypes"
                  :key="menuLiftType.id"
                >
                  <v-col>
                    <v-card
                      class="card"
                      width="180"
                      shaped
                      elevation="15"
                    >
                      <v-checkbox
                        v-model="deleteIds"
                        :value="menuLiftType.id"
                      ></v-checkbox>
                      {{ menuLiftType.name }}
                    </v-card>
                  </v-col>
                </div>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const {userId, categories} = await $axios.get("categories").then(response => {
      const userId = parseInt(response.headers["user_id"]);
      const categories = response.data;
      return {userId, categories};
    });
    const menuLiftTypes = await $axios.$get(`${route.path}`);
    const liftTypes = await $axios.get("lift_types").then(response => {
      const ids = menuLiftTypes.map(types => types.id)
      return response.data.filter(value => !ids.includes(value.id))
    });

    const bodyParts = await $axios.get("body_parts").then(response => response.data)

    const trainingMenu = await $axios.get("training_menu").then(response => {
      return response.data
        //あとで自分のメニューのみ返すようにする
        .filter(menu => menu.userId === userId)
        .filter(menu => menu.id === parseInt(route.params.id))
        [0];
    });
    return {userId, categories, menuLiftTypes, trainingMenu, liftTypes, bodyParts};
  },
  data() {
    return {
      request: {
        id: 0,
        lightRep: 0,
        lightWeight: 0,
        lightSetCount: 0,
        heavyRep: 0,
        heavyWeight: 0,
        heavySetCount: 0,
        targetBodyPartIds: [],
        isMain: 0
      },
      deleteIds: [],
      errors: [],
    };
  },
  methods: {
    registerLiftTypes() {
      if (this.validate(this.request)) return;
      this.$axios
        .post(this.$route.path, [this.request])
        .then(_ => {
          this.$axios.get("training_menu").then((response) => {
            this.trainingMenu = response.data
              //あとで自分のメニューのみ返すようにする
              .filter(menu => menu.userId === this.userId)
              .filter(menu => menu.id === parseInt(this.$route.params.id))
              [0];
          })
          location.reload();
        });
    },
    async deleteLiftTypes() {
      await this.$axios.request({
        method: 'delete',
        url: this.$route.path,
        data: [...this.deleteIds],
      }).then(_ => {
        this.$axios.get("training_menu").then(response => {
          this.trainingMenu = response.data
            //あとで自分のメニューのみ返すようにする
            .filter(menu => menu.userId === this.userId)
            .filter(menu => menu.id === parseInt(this.$route.params.id))
            [0];
        })
        location.reload();
      });
    },
    validate(val) {
      console.log(val)
      this.errors = [];
      if (!val.id) {
        this.errors.push("種目を選択してください");
      }
      if (!val.targetBodyPartIds.length) {
        this.errors.push("狙う部位を選択してください");
      }
      if (!val.isMain) {
        this.errors.push("メイン部位を選択してください");
      }
      return this.errors.length;
    },
  }
};
</script>
<style lang="sass">
.input
  border: 1px solid black


.card
  margin-bottom: 20px
</style>
