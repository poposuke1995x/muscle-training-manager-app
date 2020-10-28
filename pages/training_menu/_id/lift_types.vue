<template>
  <div>
    <h3>
      {{ trainingMenu.name }}
    </h3>
    <div
      v-for="error in errors"
      :key="error.index"
    >
      <span style="color: red;">
        {{ error }}
      </span>
    </div>
    <v-container>
      <div
        v-for="menuLiftType in menuLiftTypes"
        :key="menuLiftType.id"
      >
        <v-card class="card">
          <v-card-title>
            <nuxt-link :to="`/training_menu/${menuLiftType.id}`">
              <span class="title font-weight-light">{{ menuLiftType.name }}</span>
            </nuxt-link>
          </v-card-title>
        </v-card>
      </div>
      <v-row>
        <v-col cols="7">
          <v-select
            v-model="response.categoryId"
            :items="categories"
            item-value="id"
            item-text="name"
            clearable
            label="カテゴリーを選択"
            @change="fetchLiftTypes($event)"
          ></v-select>
          <v-select
            v-model="response.liftTypeIds"
            multiple
            :items="liftTypes"
            item-value="id"
            item-text="name"
            clearable
            label="種目を選択"
          ></v-select>
          <div v-if="response.liftTypeIds.length">
            <div
              v-for="liftType in liftTypes.filter(v => response.liftTypeIds.includes(v.id))"
              :key="liftType.id"
            >
              {{ liftType }}
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          depressed
          color="primary"
          @click="createMenu(response)"
        >登録
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData({$axios, route}) {
    const {userId, categories} = await $axios.get("categories").then((response) => {
      const userId = parseInt(response.headers["user_id"]);
      const categories = response.data;
      return {userId, categories};
    })
    const menuLiftTypes = await $axios.$get(`${route.path}`);
    const liftTypes = await $axios.get("lift_types").then(response => {
      const ids = menuLiftTypes.map(types => types.id)
      return response.data.filter(value => !ids.includes(value.id))
    });
    const trainingMenu = await $axios.get("training_menu").then((response) => {
      return response.data
        //あとで自分のメニューのみ返すようにする
        .filter(menu => menu.userId === userId)
        .filter(menu => menu.id === parseInt(route.params.id))
        [0];
    });
    return {userId, categories, menuLiftTypes, trainingMenu, liftTypes};
  },
  data() {
    return {
      response: {
        name: null,
        categoryId: 0,
        liftTypeIds: [],
        userId: this.userId,
        shareFlag: false,
      },
      errors: [],
    };
  },
  computed: {},
  methods: {
    createMenu(response) {
      if (this.validate(response)) return;
      this.$axios
        .post("training_menu", response)
        .then((v) => this.$router.push("/"));
    },
    async fetchLiftTypes(body_part_id) {
      this.liftTypes = await this.$axios.get("lift_types", {params: {body_part_id}})
        .then(response => {
          const ids = this.menuLiftTypes.map(types => types.id)
          return response.data.filter(value => !ids.includes(value.id))
        })
      console.log(this.liftTypes)
    },
    validate(val) {
      this.errors = [];
      if (!val.name) {
        this.errors.push("名前を選択してください");
      }
      if (!val.categoryId) {
        this.errors.push("カテゴリーを選択してください");
      }
      return this.errors.length;
    },
  },
  created() {
    this.response.userId = this.userId;
  },
};
</script>
<style lang="scss">
.input {
  border: 1px solid black
}

.card {
  margin-bottom: 20px;
}
</style>
