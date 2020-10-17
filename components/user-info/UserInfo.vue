<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-row justify="center">
        <ul class="info__list">
          <li class="info__item">
            <span class="info__title">Уровень: </span
            ><span class="info__param">{{ userInfo.level }}</span>
          </li>
          <li class="info__item">
            <span class="info__title">Без пропусков: </span
            ><span class="info__param">{{ allDays }}</span>
          </li>
          <li class="info__item">
            <span class="info__title">Пройдено уроков: </span
            ><span class="info__param">{{ userInfo.lessons }}</span>
          </li>
          <li class="info__item">
            <span class="info__title">Получено опыта: </span
            ><span class="info__param">{{ userInfo.exp }}</span>
          </li>
          <li class="info__item">
            <span class="info__title">Монет собрано: </span
            ><span class="info__param">{{ userInfo.money }}</span>
          </li>
        </ul>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    userInfo: Object,
  },
  data() {
    return {
      valid: true,
    }
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
