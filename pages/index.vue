<template>
  <div v-if="initialized">
    <v-container v-if="trainingMenu.length">
      <v-row>
        <div
          v-for="menu in trainingMenu"
          :key="menu.id"
        >
          <v-col>
            <v-card
              class="card"
              width="400"
              shaped
              elevation="15"
            >
              <v-container>
                <v-card-title>
                  <nuxt-link :to="`/training_menu/${menu.id}`">
                    <span class="title font-weight-light">{{ menu.name }}</span>
                  </nuxt-link>
                </v-card-title>
                <v-row>
                  <v-col>
                    <v-btn
                      @click="goLiftTypeRegistration(menu.id)"
                    >種目を追加
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col>
                    <v-btn
                      @click="deleteMenu(menu.id)"
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
        トレーニングメニューを作成しましょう
      </nuxt-link>
    </v-container>
  </div>
</template>

<script>
import auth from "../plugins/firebase";

export default {
  components: {},

  async asyncData({$axios}) {
    if (!JSON.parse(localStorage.getItem("my-key"))?.token)
      return {
        userId: 0,
        trainingMenu: [],
      };
    return $axios.get("training_menu").then((response) => {
      const userId = parseInt(response.headers["user_id"]);
      const trainingMenu = response.data
        //あとで自分のメニューのみ返すようにする
        .filter(menu => menu.userId === userId);
      return {
        userId,
        trainingMenu,
      };
    });
  },

  data() {
    return {
      initialized: false,
    };
  },
  methods: {
    goLiftTypeRegistration(menuId) {
      this.$router.push(`/training_menu/${menuId}/lift_types`)
    },
    async deleteMenu(menuId) {
      await this.$axios.request({
        method: 'delete',
        url: `/training_menu/${menuId}`
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
