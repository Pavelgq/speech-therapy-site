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
        <tr v-for="item in stats" :key="item.name">
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
    userInfo: Object,
    stats: Array,
  },
  data() {
    return {
      valid: true,
    }
  },
}
</script>

<style lang="less" scoped>
.info {
  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid black;

    &:last-child {
      margin-bottom: 10px;
      border: none;
    }
  }

  &__title {
    padding-right: 10px;
  }
}
</style>
