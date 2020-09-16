<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row justify="end">
            <h2 class="pa-3">{{ userName }}</h2>
            <v-avatar class="ma-2">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-row>
        </v-col>
      </v-row>

      <v-main>
        <v-row justify="center">
          <v-col cols="6">
            <v-row justify="center">
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
            </v-row>
          </v-col>
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
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

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
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
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
      this.$router.push('/game')
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
