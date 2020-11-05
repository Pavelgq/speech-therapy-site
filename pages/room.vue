<template>
  <v-container class="mt-2" align-start>
    <v-layout justify-start>
      <v-main>
        <v-simple-table>
          <!-- <div class="text-center title">{{ isStatus }}</div> -->
          <template v-slot:default>
            <tbody>
              <tr v-for="item in getFields" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-main>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data() {
    return {
      view: false,
      valid: true,
      user: 0,
      lesson: {},
      stats: [],
      fields: [],
      isProfile: false,
    }
  },

  computed: {
    ...mapState('user', ['status', 'profile']),
    isStatus() {
      return this.$store.state.user.status
    },
    userInfo() {
      return this.$store.state.user.profile
    },
    userName() {
      return `${this.userInfo.firstName} ${this.userInfo.lastName}`
    },
    role() {
      return this.userInfo.role === 'user' ? 'Ученик' : 'Администратор'
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
          value: this.userInfo.email,
        },
        {
          name: 'Дата регистрации',
          value: new Date(this.userInfo.createdAt).toLocaleDateString(),
        },
      ]
    },
  },
  middleware: 'authenticated',
  methods: {
    ...mapActions({
      userRequest: 'user/USER_REQUEST',
    }),
    start() {
      this.$router.push('/game')
    },
    exit() {
      this.$router.push('/')
    },
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
