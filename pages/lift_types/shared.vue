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
              </v-container>
            </v-card>
          </v-col>
        </div>
      </v-row>
    </v-container>
    <v-container v-else>
      公開されている種目はありません。
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},

  async asyncData({$axios}) {
    return await $axios.get("lift_types").then(response => {
      const userId = parseInt(response.headers["user_id"]);
      const liftTypes = response.data.filter(liftType => liftType.userId !== userId)
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
