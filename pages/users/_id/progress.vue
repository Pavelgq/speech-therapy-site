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
            <UserStatistic :data="lessons" />
          </v-col>
        </v-row>
      </v-flex>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  // validate({ params }) {
  //   return /^([0-9]{12,12})$/.test(params.id)
  // },
  created() {
    const _id = this.$route.params.id
    console.log(_id)
  },
  computed: {
    ...mapState('user', ['status', 'profile']),
    ...mapState('statistic', ['status', 'lessons']),
  },
}
</script>

<style></style>
