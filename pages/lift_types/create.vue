<template>
  <div>
    <div
      v-for="error in errors"
      :key="error.index"
    >
      <span style="color: red; ">
        <p>{{ error }}</p>
      </span>
    </div>
    <v-container>
      <v-row>
        <v-col cols="10">
          <input
            placeholder="種目名を入力"
            class="input"
            v-model="response.name"
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="20">
          <label>
            <input
              type="url"
              placeholder="参考URLを入力"
              class="input"
              v-model="response.referenceUrl"
            />
          </label>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="20">
          <v-checkbox
            v-model="response.shareFlag"
            label="他のトレーニーに共有する"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <table>
            <tr>
              <th>重量(kg)</th>
              <th>レップ数(Rep)</th>
              <th>セット数(回)</th>
            </tr>
            <tr>
              <td>
                <input
                  type="number"
                  min="0"
                  v-model="response.defaultWeight"
                  class="input"
                  style=" width: 3em;"
                >
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  v-model="response.defaultRep"
                  class="input"
                  style=" width: 3em;"
                >
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  v-model="response.defaultSetCount"
                  class="input"
                  style=" width: 3em;"
                >
              </td>
            </tr>
          </table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-textarea
            v-model="response.description"
            placeholder="説明欄"
            class="input"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            depressed
            color="primary"
            @click="createLiftType(response)"
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
  asyncData({$axios, store}) {
    return $axios.get("categories").then((response) => {
      const userId = parseInt(response.headers["user_id"]);
      return {
        userId,
      };
    });
  },
  data() {
    return {
      response: {
        name: null,
        referenceUrl: null,
        description: null,
        importedCount: 0,
        userId: 0,
        defaultRep: 0,
        defaultWeight: 0,
        defaultSetCount: 0,
        shareFlag: false,
      },
      errors: [],
    };
  },
  methods: {
    createLiftType(response) {
      if (this.validate(response)) return;
      this.$axios.post("lift_types", response).then((v) => {
        this.$router.push("/");
      });
    },
    validate(val) {
      this.errors = [];
      if (!val.name) {
        this.errors.push("名前を選択してください");
      }
      this.response.defaultRep = parseInt(this.response.defaultRep);
      this.response.defaultWeight = parseInt(this.response.defaultWeight);
      this.response.defaultSetCount = parseInt(this.response.defaultSetCount);

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
