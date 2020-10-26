<template>
  <v-app>
    <v-container fill-height class="pa-0" align-start fluid app>
      <v-layout justify-start>
        <UserNavbar :user-name="userName" @changeComponent="changeComponent" />
        <v-content v-if="view">
          <keep-alive>
            <Component
              :is="currentComponent.name"
              v-if="currentComponent.name"
              :data="currentComponent.data"
            ></Component>
          </keep-alive>
        </v-content>
        <v-content v-else>
          <div>Выберите раздел...</div>
        </v-content>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      view: false,
      valid: true,
      user: {},
      lesson: {},
      stats: [],
      currentComponent: {
        name: 'UserProgress',
        data: {},
      },
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

<style lang="less" scoped>
.info {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid black;

    &:last-child {
      margin-bottom: 10px;
      border: none;
    }
  }

  &__title {
    padding-right: 10px;
  }
}
</style>
