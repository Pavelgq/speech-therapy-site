<template>
  <v-app>
    <v-container fill-height fluid>
      <Navbar :user-name="userName" :tabs="nav" />

      <v-content>
        <Component
          :is="currentComponent.name"
          :data="currentComponent.data"
          @changeComponent="changeComponent"
        ></Component>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: true,
      user: '',
      nav: [
        {
          title: 'Добавить ученика',
          icon: '',
          component: '',
          data: {},
          acrive: true,
        },
        {
          title: 'Выбор ученика',
          icon: '',
          component: '',
          data: {},
          acrive: true,
        },
        {
          title: 'Рейтинг',
          icon: '',
          component: '',
          data: {},
          acrive: true,
        },
      ],
      currentComponent: {
        name: '',
        data: [],
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
    allDays() {
      if (this.userInfo.days) {
        return `${this.userInfo.days.length}`
      }
      return 0
    },
  },
  created() {
    if (!this.$store.user) {
      this.getInfo()
    }
  },
  middleware: 'authenticated',
  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    getInfo() {
      this.userRequest()
        .then(() => {
          this.user = this.$store.state.user.profile
        })
        .catch((e) => {
          console.log(e)
          this.exit()
        })
    },
    changeComponent(data) {
      this.currentComponent.name = data.name
      this.currentComponent.data = data.data
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
