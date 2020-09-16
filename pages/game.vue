<template>
  <v-container ref="cont">
    <div ref="root" @keyup.esc="exit"></div>
  </v-container>
</template>

<script>
import App from '~/static/src/app/app'
export default {
  data() {
    return {}
  },
  mounted() {
    this.$refs.cont.focus()
    const app = new App(this.$refs.root)
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
