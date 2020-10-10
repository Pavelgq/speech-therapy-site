<template>
  <v-container ref="cont">
    <div ref="root" @keyup.esc="exit"></div>
  </v-container>
</template>

<script>
// import { mapState } from 'vuex'
import App from 'speech-therapy-games'
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
  watch: {
    '$store.state.user.profile': () => {
      console.log(this.$store.state.user.profile)
    },
  },
  mounted() {
    this.$refs.cont.focus()
    console.log(this.profile)
    const app = new App(this.$refs.root, this.$store.state.user.profile)
    app.init()
  },
  methods: {
    exit() {
      this.$router.push('/room')
    },
  },
}
</script>

<style></style>
