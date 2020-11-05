<template>
  <v-container class="mt-2" align-start>
    <v-layout justify-start>
      <v-content>
        <UserProgress :data="user" />
      </v-content>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

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
    userInfo() {
      return this.$store.state.user.profile
    },
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
  },
  created() {
    if (!this.$store.user) {
      this.getInfo()
    }
    if (!this.$store.lesson) {
      this.getStat()
    }
  },
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
    changeComponent(data) {
      this.view = true
      switch (data.name) {
        case 'UserProgress':
          this.currentComponent.name = () =>
            import('../components/user/UserProgress.vue')
          this.currentComponent.data = this.user
          break
        case 'UserStatistic':
          this.currentComponent.name = () =>
            import('../components/user/UserStatistic.vue')
          this.currentComponent.data = this.lessons
          break
        default:
          break
      }
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
