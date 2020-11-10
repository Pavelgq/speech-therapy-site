<template>
  <v-main>
    <v-flex v-for="item in usersList" :key="item.login">
      <UserCard :data="item" />
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
