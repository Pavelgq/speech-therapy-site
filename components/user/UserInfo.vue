<template>
  <v-layout justify-center wrap>
    <SimpleTable :fields="getFields" />
  </v-layout>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  computed: {
    userName() {
      return `${this.data.firstName} ${this.data.lastName}`
    },
    role() {
      return this.data.role === 'user' ? 'Ученик' : 'Администратор'
    },
    getFields() {
      return [
        {
          name: 'ФИО',
          value: this.userName,
        },
        {
          name: 'Статус',
          value: this.role,
        },
        {
          name: 'E-mail',
          value: this.data.email,
        },
        {
          name: 'Дата регистрации',
          value: new Date(this.data.createdAt).toLocaleDateString(),
        },
      ]
    },
  },
  methods: {},
}
</script>

<style></style>
