<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Характеристика</th>
          <th class="text-left">Показатель</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in fields" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    fields: Array,
  },
}
</script>

<style lang="less" scoped></style>
