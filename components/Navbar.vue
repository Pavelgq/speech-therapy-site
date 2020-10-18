<template>
  <v-navigation-drawer permanent left>
    <UserLogo :user-name="userName" />

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item justify="center">
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
      </v-list-item>
      <v-list-item v-for="tab in tabs" :key="tab.title" link>
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
    userName: String,
    tabs: Array,
  },
  data() {
    return {
      valid: true,
    }
  },
  methods: {
    start() {
      this.$router.push('/game')
    },
  },
}
</script>

<style lang="less" scoped></style>
