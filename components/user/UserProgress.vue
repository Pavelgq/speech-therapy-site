<template>
  <v-container>
    <v-row justify="center">
      <v-col justify="center">
        <div class="text-center title">Достижения</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <SimpleTable :fields="stats" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserProgress',
  props: {
    data: Object,
  },
  data() {
    return {
      stats: [
        {
          name: 'Пройдено уроков',
          value: this.data.lessons,
        },
        {
          name: 'Текущий уровень',
          value: this.data.level,
        },
        {
          name: 'Дней подряд',
          value: this.allDays(),
        },
        {
          name: 'Получено опыта',
          value: this.data.exp,
        },
        {
          name: 'Заработано монет',
          value: this.data.money,
        },
      ],
    }
  },
  methods: {
    allDays() {
      if (this.data.days) {
        return `${this.data.days.length}`
      }
      return 0
    },
  },
}
</script>

<style></style>
