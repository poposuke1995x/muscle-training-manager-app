<template>
  <div v-if="initialized">
    <v-container v-if="trainingMenu.length">
      <div
        v-for="menu in trainingMenu"
        :key="menu.id"
      >
        <v-card class="card">
          <v-card-title>
            <nuxt-link :to="`/training_menu/${menu.id}`">
              <span class="title font-weight-light">{{ menu.name }}</span>
            </nuxt-link>
          </v-card-title>
          <v-btn
            @click="goLiftTypeRegistration(menu.id)"
          >種目を追加
          </v-btn>
        </v-card>
      </div>
    </v-container>
    <v-container v-else>
      トレーニングメニューを作成しましょう
    </v-container>
  </div>
</template>

<script>
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
    }
  },
  async created() {
    this.initialized = true;
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 20px;
}

</style>
