<template v-slot:prepend>
  <v-list-item two-line>
    <v-list-item-avatar>
      <img src="../../static/assets/images/avatar-men-1.jpg" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>{{ userName }}</v-list-item-title>
      <v-list-item-subtitle>В сети</v-list-item-subtitle>
    </v-list-item-content>
    <div class="button--logout">
      <v-btn color="secondary" fab x-small @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-list-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    userName: String,
  },
  methods: {
    ...mapActions({
      logoutUser: 'auth/AUTH_LOGOUT',
    }),
    logout() {
      this.logoutUser().catch((e) => console.log(e))
      localStorage.removeItem('user-token')
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
