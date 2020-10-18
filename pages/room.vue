<template>
  <v-app>
    <v-container fill-height fluid>
      <Navbar :user-name="userName" :tabs="nav" />

      <v-content>
        <UserInfo :user-info="userInfo" :stats="stats" />
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
          title: 'Информация',
          icon: '',
          acrive: true,
        },
        {
          title: 'Статистика',
          icon: '',
          acrive: true,
        },
        {
          title: 'Магазин',
          icon: '',
          acrive: true,
        },
      ],
      stats: [],
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
          this.getStats(this.user)
        })
        .catch((e) => {
          console.log(e)
          this.exit()
        })
    },
    getStats(data) {
      this.stats = [
        {
          name: 'Пройдено уроков',
          value: data.lessons,
        },
        {
          name: 'Текущий уровень',
          value: data.level,
        },
        {
          name: 'Дней подряд',
          value: this.allDays,
        },
        {
          name: 'Получено опыта',
          value: data.exp,
        },
        {
          name: 'Заработано монет',
          value: data.money,
        },
      ]
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
