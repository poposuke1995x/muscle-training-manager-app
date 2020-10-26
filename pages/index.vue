<template>
  <div v-if="initialized">
    <div v-if="trainingMenu.length">
      <div
        v-for="menu in trainingMenu"
        :key="menu.id"
      >
        <v-card>
          <v-card-title>
            <nuxt-link :to="`/training_menu/${menu.id}`">
              <span class="title font-weight-light">{{ menu.name }}</span>
            </nuxt-link>
          </v-card-title>
          <v-btn>種目を追加</v-btn>
        </v-card>
      </div>
    </div>
    <div v-else>
      トレーニングメニューを作成しましょう
    </div>
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
      const userId = response.headers["user_id"];
      const trainingMenu = response.data.filter(
        (menu) => menu.userId == userId
      );
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
  async created() {
    this.initialized = true;
  },
};
</script>
