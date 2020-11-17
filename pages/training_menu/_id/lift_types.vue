<template>
  <div>
    <h3>
      {{ trainingMenu.name }}
    </h3>
    <div
      v-for="error in errors"
      :key="error.index"
    >
      <span style="color: #ff0000;">
        {{ error }}
      </span>
    </div>
    <v-container>
      <div v-if="!menuLiftTypes.length">種目を追加しましょう</div>
      <div v-else>
        <v-btn
          @click="deleteLiftTypes()"
        >チェックした項目をメニューから削除
        </v-btn>
        <div
          v-for="menuLiftType in menuLiftTypes"
          :key="menuLiftType.id"
        >
          <v-card class="card">
            <v-checkbox
              v-model="deleteIds"
              :value="menuLiftType.id"
              @change="changeCheckBoxState($event)"
            ></v-checkbox>
            <v-card-title>
              <nuxt-link :to="`/training_menu/${menuLiftType.id}`">
                <span class="title font-weight-light">{{ menuLiftType.name }}</span>
              </nuxt-link>
            </v-card-title>
          </v-card>
        </div>
      </div>
      <v-row>
        <v-col cols="7">
          <v-select
            v-model="request.id"
            :items="liftTypes"
            item-value="id"
            item-text="name"
            clearable
            label="種目を選択"
          ></v-select>
          <v-select
            v-model="request.targetBodyPartIds"
            multiple
            :items="bodyParts"
            item-value="id"
            item-text="name"
            clearable
            label="狙う部位を選択"
          ></v-select>
          <v-select
            v-model="request.isMain"
            :items="bodyParts.filter(bodyPart => request.targetBodyPartIds.includes(bodyPart.id))"
            item-value="id"
            item-text="name"
            clearable
            label="メイン部位を選択"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>

        <table>
          <tr>
            <th></th>
            <th>重量(kg)</th>
            <th>レップ数(Rep)</th>
            <th>セット数(回)</th>
          </tr>
          <tr>
            <th>高重量</th>
            <td><label>
              <input
                type="number"
                v-model="request.heavyWeight"
                style=" width: 3em;"
                @change="request.heavyWeight = parseInt(request.heavyWeight)"
              >
            </label></td>
            <td><label>
              <input
                type="number"
                v-model="request.heavyRep"
                style=" width: 3em;"
                @change="request.heavyRep = parseInt(request.heavyRep)"
              >
            </label></td>
            <td><label>
              <input
                type="number"
                v-model="request.heavySetCount"
                style=" width: 3em;"
                @change="request.heavySetCount = parseInt(request.heavySetCount)"
              >
            </label></td>
          </tr>
          <tr>
            <th>低重量</th>
            <td><label>
              <input
                type="number"
                v-model="request.lightWeight"
                style=" width: 3em;"
                @change="request.lightWeight = parseInt(request.lightWeight)"

              >
            </label></td>
            <td><label>
              <input
                type="number"
                v-model="request.lightRep"
                style=" width: 3em;"
                @change="request.lightRep = parseInt(request.lightRep)"
              >
            </label></td>
            <td><label>
              <input
                type="number"
                v-model="request.lightSetCount"
                style=" width: 3em;"
                @change="request.lightSetCount = parseInt(request.lightSetCount)"
              >
            </label></td>
          </tr>
        </table>
      </v-row>
      <v-row>
        <v-btn
          depressed
          color="primary"
          @click="registerLiftTypes()"
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

    const bodyParts = await $axios.get("body_parts").then(response => response.data)

    const trainingMenu = await $axios.get("training_menu").then((response) => {
      return response.data
        //あとで自分のメニューのみ返すようにする
        .filter(menu => menu.userId === userId)
        .filter(menu => menu.id === parseInt(route.params.id))
        [0];
    });
    return {userId, categories, menuLiftTypes, trainingMenu, liftTypes, bodyParts};
  },
  data() {
    return {
      request: {
        id: 0,
        lightRep: 0,
        lightWeight: 0,
        lightSetCount: 0,
        heavyRep: 0,
        heavyWeight: 0,
        heavySetCount: 0,
        targetBodyPartIds: [],
        isMain: 0
      },
      deleteIds: [],
      errors: [],
    };
  },
  computed: {
    // deleteIds() {
    //   const deleteIds = [...(new Set(this.deleteIds))];
    //   return deleteIds.map(dId => {
    //     const count = this.deleteIds.filter(id => id === dId).length
    //     return Array(count).fill(dId)
    //   })
    // }
  },
  methods: {
    registerLiftTypes() {
      if (this.validate(this.request)) return;
      this.$axios
        .post(this.$route.path, [this.request])
        .then((v) => {
          this.$axios.get("training_menu").then((response) => {
            this.trainingMenu = response.data
              //あとで自分のメニューのみ返すようにする
              .filter(menu => menu.userId === this.userId)
              .filter(menu => menu.id === parseInt(this.$route.params.id))
              [0];
          })
          location.reload()
        });
    },
    deleteLiftTypes() {
      this.$axios.request({
        method: 'delete',
        url: this.$route.path,
        data: [...this.deleteIds],
      }).then((v) => {
        this.$axios.get("training_menu").then((response) => {
          this.trainingMenu = response.data
            //あとで自分のメニューのみ返すようにする
            .filter(menu => menu.userId === this.userId)
            .filter(menu => menu.id === parseInt(this.$route.params.id))
            [0];
        })
        location.reload()
      });
    },
    changeCheckBoxState(val) {
      console.log(this.deleteIds)
    },
    validate(val) {
      this.errors = [];
      // if (!val.name) {
      //   this.errors.push("名前を選択してください");
      // }
      // if (!val.categoryId) {
      //   this.errors.push("カテゴリーを選択してください");
      // }
      // return this.errors.length;
    },
  },
  created() {
    // this.response.userId = this.userId;
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
