<template>
  <v-container>
    <v-flex tag="section">
      <v-row justify="center" class="primary">
        <v-col>
          <v-date-picker
            v-model="dates"
            multiple
            no-title
            scrollable
            readonly
          ></v-date-picker>
        </v-col>
        <v-col>
          <SimpleTable :fields="stats" :title="title" />
        </v-col>
      </v-row>
    </v-flex>
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
      dates: this.days(),
      title: 'Достижение',
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
        const str = date.toISOString()
        return str.substring(0, 10)
      })
      return mas
    },
  },
}
</script>

<style></style>
