<template>
  <div>
        <v-btn color="primary" @click="logout">Logout</v-btn>

  </div>
</template>

<script>
import auth from '../plugins/firebase'
export default {
  methods: {
    logout() {
      localStorage.clear()
      auth.signOut();
    }
  }
}
</script>
