<template>
  <v-card router :to="createRoute">
    <v-card-title> {{ data.firstName }} {{ data.lastName }} </v-card-title>
    <v-card-subtitle> Информация </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    id: String,
    data: Object,
  },
  computed: {
    createRoute() {
      return `users/${this.id}/progress`
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      console.log(this.data)
    },
  },
}
</script>

<style></style>
