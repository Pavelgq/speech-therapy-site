<template>
  <v-app>
    <Navbar />
    <v-avatar>
      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>
    <v-main>
      <v-container fluid>
        <v-layout justify-center>
          <ul class="info__list">
            <li class="info__item">
              <span class="info__title">Дней в игре</span
              ><span class="info__param">1</span>
            </li>
            <li class="info__item">
              <span class="info__title">Пройдено уроков</span
              ><span class="info__param">1</span>
            </li>
            <li class="info__item">
              <span class="info__title">Монет собрано</span
              ><span class="info__param">1</span>
            </li>
            <li class="info__item">
              <span class="info__title">Время реакции</span
              ><span class="info__param">1</span>
            </li>
          </ul>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',

  computed: {
    userInfo() {
      return this.$store.state.user.profile
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
  }
}
</style>
