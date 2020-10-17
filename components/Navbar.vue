<template>
  <v-navigation-drawer permanent left>
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img src="../static/src/assets/images/avatar-men-1.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
          <v-list-item-subtitle>В сети</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

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
      <v-list-item>
        <v-list-item-icon>
          <v-icon></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Информация</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Статистика</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Магазин</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    userName: String,
  },
  data() {
    return {
      valid: true,
    }
  },
}
</script>

<style lang="less" scoped></style>
