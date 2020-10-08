<template>
  <div>
    <v-form>
      <v-container>
        <v-text-field label="MailAddress" v-model="email"></v-text-field>
        <v-text-field label="Password" v-model="password" type="password"></v-text-field>
        <v-btn color="primary" @click="login">Login</v-btn>
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
        .signInWithEmailAndPassword(this.email, this.password).then(() => {
          this.$router.push("/")
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>
