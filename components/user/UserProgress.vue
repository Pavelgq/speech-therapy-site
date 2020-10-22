<template>
  <v-container>
    <v-row justify="around">
      <v-col>
        <v-date-picker
          v-model="dates"
          multiple
          no-title
          scrollable
        ></v-date-picker>
      </v-col>
      <v-col>
        <SimpleTable :fields="stats" :title="Достижения" />
      </v-col>
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
      dates: ['10-11-2020'],
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
    days() {
      const mas = this.data.days.map((element) => {
        const date = new Date(element)
        return date.toISOString()
      })
      return mas
    },
  },
}
</script>

<style></style>
