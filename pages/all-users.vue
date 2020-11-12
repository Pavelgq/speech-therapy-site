<template>
  <v-main>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :custom-filter="filterText"
      >
        <template v-slot:[`item.route`]="{ item }">
          <router-link :to="item.route"> Подробнее </router-link>
        </template>
      </v-data-table>
    </v-card>
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import UserCard from '../components/admin/UserCard'
export default {
  layout: 'dashboard',
  // components: {
  //   UserCard,
  // },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Имя',
          align: 'start',
          filterable: true,
          value: 'name',
        },
        { text: 'Класс', value: 'classGroup' },
        { text: 'Пройдено уроков', value: 'lessons', filterable: false },
        { text: 'Текущий уровень', value: 'level', filterable: false },
        { text: 'Дней занимался', value: 'allDays', filterable: false },
        { text: 'Непрерывно', value: 'continuously', filterable: false },
        { text: '', value: 'route' },
      ],
      items: [],
    }
  },
  computed: {
    ...mapState('admin', ['status', 'usersList']),
  },
  created() {
    this.getUsers()
  },
  // middleware: 'refresh',
  methods: {
    ...mapActions({
      allUser: 'admin/USER_ALL',
    }),
    getUsers() {
      this.allUser()
        .then((res) => {
          this.userData()
          this.serverState = ''
        })
        .catch((e) => {
          this.serverState = 'Сервер не отвечает, попробуйте позже'
        })
    },
    userData() {
      if (Object.keys(this.usersList).length !== 0) {
        for (const key in this.usersList) {
          this.items.push({
            name: `${this.usersList[key].firstName} ${this.usersList[key].lastName}`,
            classGroup: this.usersList[key].classGroup,
            lessons: this.usersList[key].lessons,
            level: this.usersList[key].level,
            allDays: this.allDays(this.usersList[key]),
            continuously: this.continuouslyDays(this.usersList[key]),
            route: this.createRoute(this.usersList[key]._id),
          })
        }
      }
    },
    createRoute(id) {
      return `users/${id}/progress`
    },
    allDays(obj) {
      if (obj.days) {
        return `${obj.days.length}`
      }
      return 0
    },
    continuouslyDays(obj) {
      if (obj.days) {
        let count = obj.days.length > 0 ? 1 : 0
        for (let i = obj.days.length - 1; i > 0; i--) {
          const now = obj.days[i]
          const prev = obj.days[i]
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
    filterText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().includes(search)
      )
    },
  },
}
</script>

<style></style>
