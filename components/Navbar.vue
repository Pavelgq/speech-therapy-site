<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="4000" top color="success">
      <span>Awesome! You added a new project.</span>
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-app-bar app>
      <v-app-bar-nav-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Speach</span>
        <span>Therapy</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-layout column align-center>
        <v-flex>
          <UserLogo :user-name="userName" />
          <v-divider></v-divider>
        </v-flex>
      </v-layout>

      <v-list dense>
        <v-list-item justify="center">
          <v-row class="justify-center">
            <v-btn
              rounded
              color="red darken-3"
              :disabled="!valid"
              class="mr-4"
              @click="startGame"
            >
              Начать урок
            </v-btn>
          </v-row>
        </v-list-item>
        <v-list-item
          v-for="tab in currentTabs"
          :key="tab.title"
          router
          :to="tab.route"
          :class="{ selected: tab === selectedTab }"
        >
          <v-list-item-icon>
            <v-icon>{{ tab.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ tab.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      valid: true,
      tabs: [
        {
          title: 'Профиль',
          icon: 'mdi-badge-account-horizontal-outline',
          route: '/room',
          access: 'all',
        },
        {
          title: 'Добавить ученика',
          icon: 'mdi-plus',
          route: '/add-user',
          access: 'admin',
        },
        {
          title: 'Список учеников',
          icon: 'mdi-clipboard-list-outline',
          route: '/all-users',
          access: 'admin',
        },
        {
          title: 'Прогресc',
          icon: 'mdi-chart-bell-curve',
          route: '/progress',
          access: 'user',
        },
      ],
      selectedTab: {},
      snackbar: false,
      user: {},
    }
  },
  computed: {
    ...mapState('user', ['status', 'profile']),
    userInfo() {
      return this.profile
    },
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
    currentTabs() {
      return this.tabs.filter((el) => {
        if (el.access === 'all' || el.access === this.profile.role) {
          return true
        }
      })
    },
  },
  created() {
    if (!this.$store.user) {
      this.getInfo()
    }
  },
  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    getInfo() {
      this.userRequest()
        .then(() => {
          this.user = this.profile
        })
        .catch((e) => {
          this.exit()
        })
    },
    startGame() {
      this.$router.push('/game')
    },
    exit() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less" scoped>
.selected {
  background-color: #dddddd;
}
</style>
