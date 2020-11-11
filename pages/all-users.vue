<template>
  <v-main>
    <v-flex v-for="(value, name) in usersList" :key="name">
      <UserCard :id="name" :data="value" />
    </v-flex>
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import UserCard from '../components/admin/UserCard'
export default {
  layout: 'dashboard',
  components: {
    UserCard,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('admin', ['status', 'usersList']),
  },
  created() {
    this.getUsers()
  },
  // middleware: 'refresh',
  methods: {
    ...mapActions({
      allUser: 'admin/USER_ALL',
    }),
    getUsers() {
      this.allUser()
        .then((res) => {
          this.serverState = ''
        })
        .catch((e) => {
          this.serverState = 'Сервер не отвечает, попробуйте позже'
        })
    },
  },
}
</script>

<style></style>
