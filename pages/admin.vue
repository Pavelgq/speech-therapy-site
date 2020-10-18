<template>
  <p>Админка</p>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    if (!this.$store.user) {
      this.userRequest()
        .then((result) => {
          console.log('sucess')
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
  },
}
</script>

<style></style>
