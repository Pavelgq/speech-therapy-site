<template>
  <v-app>
    <v-container fill-height fluid>
      <Navbar :user-name="userName" />

      <v-content>
        <UserInfo :user-info="userInfo" />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      user: this.$store.user,
    }
  },

  computed: {
    userInfo() {
      return this.$store.state.user.profile
    },
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
    allDays() {
      if (this.userInfo.days) {
        return `${this.userInfo.days.length}`
      }
      return 0
    },
  },
  created() {
    if (!this.$store.user) {
      this.userRequest().then((result) => {
        console.log('sucess')
      })
    }
  },
  middleware: 'authenticated',
  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    getInfo() {},
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
