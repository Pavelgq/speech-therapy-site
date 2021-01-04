<template>
  <v-container ref="cont">
    <v-row justify="center">
      <v-col justify="center">
        <div ref="root" @keyup.esc="exit"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import App from 'speech-therapy-games'
import { mapActions, mapState } from 'vuex'

export default {
  // props: {
  //   user: {
  //     type: Object,
  //     required: false,
  //   },
  // },
  data() {
    return {
      app: {},
    }
  },
  computed: {
    ...mapState('user', ['status', 'profile']),
    userInfo: () => {
      return this.profile
    },
  },
  // watch: {
  //   '$store.state.user.profile': () => {
  //     console.log(this.$store.state.user.profile)
  //   },
  // },
  middleware: 'not-authenticated',
  mounted() {
    console.log(this.status, this.profile)
    this.$refs.cont.focus()
    if (!this.status) {
      this.userRequest()
        .then(() => {
          this.createLesson()
        })
        .catch((e) => {
          this.exit()
        })
    } else {
      this.createLesson()
    }
  },

  beforeDestroy() {
    // вызывть метод exit перед уничтожением компонента
    this.app.exit()
    // this.app.view.dispatch('exitGame', this.exit)
  },

  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
      userUpdate: 'user/USER_UPDATE',
      lessonAdd: 'statistic/LESSON_ADD',
    }),
    updateUserData(obj) {
      this.userUpdate(obj).catch((e) => console.log(e)) // В obj должен присутствовать _id
    },
    addLessonData(obj) {
      this.lessonAdd(obj).catch((e) => console.log(e))
    },
    exit() {
      this.$router.push('/room')
    },
    createLesson() {
      this.app = new App(this.$refs.root, this.profile)
      this.app.init()
      this.app.view.dispatch('exitGame', this.exit)
      this.app.dispatch('updateUser', this.updateUserData)
      this.app.dispatch('addLesson', this.addLessonData)
    },
  },
}
</script>

<style></style>
