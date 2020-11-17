<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <div v-if="route !== '/login'">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: "mdi-apps",
          title: "ホーム",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "メニューの作成",
          to: "/training_menu/create",
        },
        {
          icon: "mdi-chart-bubble",
          title: "種目の作成",
          to: "/lift_types",
        },
        {
          icon: "mdi-chart-bubble",
          title: "種目をメニューへ追加",
          to: "/inspire",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Logout",
          to: "/logout",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Muscle Training Manager",
    };
  },
  computed: {
    route() {
      return this.$route.path;
    },
  },
  created() {
    // console.log(this.$route.path);
  },
};
</script>

<style lang="scss"></style>
