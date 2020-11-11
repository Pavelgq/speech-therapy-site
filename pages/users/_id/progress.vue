<template>
  <v-main>
    <v-container justify-center fluid>
      <v-flex tag="section">
        <v-row>
          <v-col>
            <UserProgress v-if="status === 'success'" :data="getUserData" />
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <UserStatistic :data="currentLessons" />
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
  // validate({ params }) {
  //   return /^([0-9]{12,12})$/.test(params.id)
  // },
  data() {
    return {
      id: '',
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getStat()
  },
  computed: {
    ...mapState('admin', ['status', 'usersList']),
    ...mapState('statistic', ['status', 'currentLessons']),
    getUserData() {
      return this.usersList[this.id]
    },
  },
  middleware: 'refresh',
  methods: {
    ...mapActions({
      lessonRequest: 'statistic/LESSON_USER_REQUEST',
    }),
    getStat() {
      this.lessonRequest(this.id)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>

<style></style>
