<template>
  <v-main>
    <v-container fluid>
      <v-row xs12 sm6 color="primary">
        <v-col>
          <UserInfo :data="userInfo" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      view: false,
      valid: true,
      user: 0,
      lesson: {},
      stats: [],
      fields: [],
      isProfile: false,
    }
  },

  computed: {
    ...mapState('user', ['status', 'profile']),
    isStatus() {
      return this.$store.state.user.status
    },
    userInfo() {
      return this.$store.state.user.profile
    },
  },
  middleware: 'not-authenticated',
  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    start() {
      this.$router.push('/game')
    },
    exit() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less" scoped>
.info {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid black;

    &:last-child {
      margin-bottom: 10px;
      border: none;
    }
  }

  &__title {
    padding-right: 10px;
  }
}
</style>
