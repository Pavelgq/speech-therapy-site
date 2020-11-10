<template>
  <v-card>
    <v-card-title> {{ data.firstName }} {{ data.lastName }} </v-card-title>
    <v-card-subtitle> Информация </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    data: Object,
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
