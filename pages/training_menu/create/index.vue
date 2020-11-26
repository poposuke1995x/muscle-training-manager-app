<template>
  <div>
    <div
      v-for="error in errors"
      :key="error.index"
    >
      <span style="color: red; ">
        {{ error }}
      </span>
    </div>
    <v-container>
      <v-row>
        <v-col cols="10">
          <label>
            <input
              placeholder="トレーニング名を入力"
              class="input"
              v-model="response.name"
            >
          </label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <v-select
            v-model="response.categoryId"
            :items="categories"
            item-value="id"
            item-text="name"
            clearable
            label="カテゴリーを選択"
          ></v-select>
          <v-checkbox
            v-model="response.shareFlag"
            label="他のトレーニーに共有する"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            depressed
            color="primary"
            @click="createMenu(response)"
            class="button"
          >作成
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
export default {
  asyncData({$axios}) {
    return $axios.get("categories").then((response) => {
      const userId = parseInt(response.headers["user_id"]);
      const categories = response.data;
      return {
        userId,
        categories,
      };
    });
  },
  data() {
    return {
      response: {
        name: null,
        categoryId: 0,
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
<style lang="sass">
.input
  border: 1px solid black
</style>
