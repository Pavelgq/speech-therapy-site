<template>
  <v-app>
    <v-container fluid>
      <v-col>
        <v-row class="justify-end">
          <h2 class="pa-2">{{ userInfo.login }}</h2>
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-row>
      </v-col>
    </v-container>

    <v-main>
      <v-container align-start justify-center fluid>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <ul class="info__list">
              <li class="info__item">
                <span class="info__title">Дней в игре: </span
                ><span class="info__param">{{ userInfo.days }}</span>
              </li>
              <li class="info__item">
                <span class="info__title">Пройдено уроков: </span
                ><span class="info__param">{{ userInfo.lessons }}</span>
              </li>
              <li class="info__item">
                <span class="info__title">Монет собрано: </span
                ><span class="info__param">{{ userInfo.money }}</span>
              </li>
              <li class="info__item">
                <span class="info__title">Время реакции: </span
                ><span class="info__param">1</span>
              </li>
            </ul>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="justify-center">
          <v-btn
            rounded
            color="red darken-3"
            :disabled="!valid"
            class="mr-4"
            @click="start"
          >
            Начать урок
          </v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import App from '~/static/src/app/app'
export default {
  data() {
    return {
      valid: true,
    }
  },

  computed: {
    userInfo() {
      return this.$store.state.user.profile
    },
  },
  created() {
    if (!this.$store.user) {
      this.userRequest().then(() => {
        console.log('sucess')
      })
    }
  },
  middleware: 'authenticated',

  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    getInfo() {},
    start() {
      const app = new App()
      app.init()
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
}
</style>
