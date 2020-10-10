<template>
  <div>
    <div v-for="menu in trainingMenu" :key="menu.id">
      <v-card>
        <v-card-title>
          <nuxt-link :to="`/training_menu/${menu.id}`">
            <span class="title font-weight-light">{{ menu.name }}</span>
          </nuxt-link>
        </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
import auth from "../plugins/firebase";
export default {
  components: {},
  async asyncData({ $axios }) {
    const response = await $axios.$get("training_menu");
    return { response };
  },
  data() {
    return {};
  },
  computed: {
    trainingMenu() {
      return this.response.filter(menu => menu.id === 1)
    }
  },
  async created() {
    auth.currentUser.getIdToken(true).then((token) => console.log(token));
  },
};
</script>
