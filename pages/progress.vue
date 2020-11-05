<template>
  <v-container class="mt-2" align-start>
    <v-layout justify-start>
      <v-main>
        <UserProgress v-if="status === 'success'" :data="profile" />
        <v-progress-circular
          v-else
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      view: false,
      valid: true,
      user: {},
      lesson: {},
      stats: [],
    }
  },

  computed: {
    ...mapState('user', ['status', 'profile']),
    userInfo() {
      return this.profile
    },
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
  },
  // created() {
  //   if (!this.$store.user) {
  //     this.getInfo()
  //   }
  //   if (!this.$store.lesson) {
  //     this.getStat()
  //   }
  // },
  middleware: 'authenticated',
  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
      lessonRequest: 'statistic/LESSON_REQUEST',
    }),
    getInfo() {
      this.userRequest()
        .then(() => {
          this.user = this.$store.state.user.profile
          // this.changeComponent({ name: 'UserProgress' })
        })
        .catch((e) => {
          this.exit()
        })
    },
    getStat() {
      this.lessonRequest()
        .then(() => {
          this.lessons = this.$store.state.statistic.lessons
          // this.changeComponent({ name: 'UserStatistic' })
        })
        .catch((e) => {
          this.exit()
        })
    },
    start() {
      this.$router.push('/game')
    },
    exit() {
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
