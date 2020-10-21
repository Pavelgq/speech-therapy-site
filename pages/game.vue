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
import { mapActions } from 'vuex'

export default {
  props: {
    user: Object,
  },
  data() {
    return {}
  },
  computed: {
    // ...mapState('user', ['profile']),
    userInfo: () => {
      return this.$store.state.user.profile
    },
  },
  // watch: {
  //   '$store.state.user.profile': () => {
  //     console.log(this.$store.state.user.profile)
  //   },
  // },
  middleware: 'authenticated',
  mounted() {
    this.$refs.cont.focus()
    console.log(this.profile)
    if (!this.$store.user) {
      this.userRequest()
        .then(() => {
          console.log('sucess')
          const app = new App(this.$refs.root, this.$store.state.user.profile)
          app.init()
          app.view.dispatch('exitGame', this.exit)
        })
        .catch((e) => {
          console.log(e)
          this.exit()
        })
    }
  },

  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    exit() {
      this.$router.push('/room')
    },
  },
}
</script>

<style></style>
