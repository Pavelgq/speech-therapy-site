<template>
  <v-navigation-drawer permanent left>
    <UserLogo :user-name="userName" />

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item justify="center">
        <v-row justify="center">
          <v-btn
            rounded
            color="red darken-3"
            :disabled="!valid"
            class="mb-2"
            @click="start"
          >
            Начать урок
          </v-btn>
        </v-row>
      </v-list-item>
      <v-list-item
        v-for="tab in tabs"
        :key="tab.title"
        link
        :class="{ selected: tab === selectedTab }"
        @click="changeComponent(tab)"
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
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: 'Noname',
      require: true,
    },
  },
  data() {
    return {
      valid: true,
      tabs: [
        {
          title: 'Достижения',
          icon: '',
          component: 'UserProgress',
        },
        {
          title: 'Статистика',
          icon: '',
          component: 'UserStatistic',
        },
      ],
      selectedTab: null,
    }
  },
  // mounted() {
  //   if (!this.selectedTab) {
  //     this.selectedTab = this.tabs[0]
  //   }
  // },
  methods: {
    start() {
      this.$router.push('/game')
    },
    changeComponent(tab) {
      this.selectedTab = tab
      this.$emit('changeComponent', {
        name: tab.component,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.selected {
  background-color: #dddddd;
}
</style>
