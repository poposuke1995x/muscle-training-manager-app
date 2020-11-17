<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="メールアドレス"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="パスワード"
              v-model="password"
              type="password"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              color="primary"
              @click="login"
            >ログイン</v-btn>
            <v-btn
              color="primary"
              @click="signup"
            >新規登録</v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-form>
  </div>
</template>

<script>
import auth from "../plugins/firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push("/"))
        .catch((error) => {
          alert(error);
        });
    },
    signup() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => this.$router.push("/"))
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
