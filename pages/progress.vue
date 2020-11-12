<template>
  <v-main>
    <v-container justify-center fluid>
      <v-flex tag="section">
        <v-row>
          <v-col>
            <UserProgress v-if="status === 'success'" :data="profile" />
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <UserStatistic v-if="statusLessons === 'success'" :data="lessons" />
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-col>
        </v-row>
      </v-flex>
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
      user: {},
      lesson: {},
      stats: [],
    }
  },

  computed: {
    ...mapState('user', ['status', 'profile']),
    ...mapState('statistic', ['statusLessons', 'lessons']),
    userInfo() {
      return this.profile
    },
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
  },
  created() {
    // if (!this.$store.user) {
    //   this.getInfo()
    // }
    console.log(this)
    if (!this.$store.lesson) {
      this.getStat()
    }
  },
  middleware: 'not-authenticated',
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
      this.lessonRequest().catch((e) => {
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
