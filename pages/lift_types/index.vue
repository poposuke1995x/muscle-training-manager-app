<template>
  <div v-if="initialized">
    <v-container v-if="liftTypes.length">
      <v-row>
        <div
          v-for="liftType in liftTypes"
          :key="liftType.id"
        >
          <v-col>
            <v-card
              class="card"
              width="400"
              shaped
              elevation="15"
            >
              <v-container>
                <v-card-title>{{ liftType.name }}
                  <pre> </pre>
                  <v-btn
                    @click="goMovie(liftType.referenceUrl)"
                    v-show="liftType.referenceUrl"
                  >参考動画を視聴
                  </v-btn>
                </v-card-title>
                <v-row>
                  <v-col>
                    <v-card-text>
                      <h5>説明</h5>
                      {{ liftType.description || "説明がありません" }}
                    </v-card-text>
                  </v-col>

                </v-row>
                <v-row>
               <v-spacer></v-spacer>
                  <v-col></v-col>
                  <v-col>
                    <v-btn
                      @click="deleteLiftType(liftType.id)"
                      class="delete-button"
                    >削除
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>

        </div>

      </v-row>
    </v-container>
    <v-container v-else>
      <nuxt-link :to="'/training_menu/create'">
        種目を作成しましょう
      </nuxt-link>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},

  async asyncData({$axios}) {
    return await $axios.get("lift_types/user").then(response => {
      const userId = parseInt(response.headers["user_id"]);
      const liftTypes = response.data
      return {
        userId,
        liftTypes,
      };
    });
  },

  data() {
    return {
      initialized: false,
    };
  },
  methods: {
    goMovie(url) {
      window.open(url)
    },
    async deleteLiftType(liftTypeId) {
      await this.$axios.request({
        method: 'delete',
        url: `/lift_types/${liftTypeId}`
      }).then(_ => location.reload())
    }
  },
  async created() {
    this.initialized = true;
  },
};
</script>

<style lang="sass">
.card
  margin-bottom: 20px


</style>
