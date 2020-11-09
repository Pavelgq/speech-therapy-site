<template>
  <v-layout justify-center wrap>
    <v-flex ma-2 grow shrink>
      <v-date-picker
        v-model="dates"
        multiple
        no-title
        scrollable
        readonly
      ></v-date-picker>
    </v-flex>
    <v-flex ma-2 grow shrink>
      <SimpleTable :fields="stats" :title="title" />
    </v-flex>
  </v-layout>
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
          name: 'Дней занимался',
          value: this.allDays(),
        },
        {
          name: 'Непрерывно',
          value: this.continuouslyDays(),
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
    continuouslyDays() {
      if (this.data.days) {
        let count = 0
        for (let i = this.data.days.length - 1; i > 0; i--) {
          const now = this.data.days[i]
          const prev = this.data.days[i]
          if (
            new Date(now) - new Date(prev) > 24 * 60 * 60 * 1000 &&
            new Date(now) - new Date(prev) < 48 * 60 * 60 * 1000
          ) {
            count += 1
          } else {
            count = 1
            break
          }
        }
        return count
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

<style lang="less" scoped></style>
