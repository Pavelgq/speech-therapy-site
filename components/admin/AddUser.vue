<template>
  <v-card ref="form" width="400">
    <v-card-title>
      <span class="headline">Данные нового ученика</span>
    </v-card-title>
    <v-card-text>
      <v-text-field
        ref="firstName"
        v-model="newUser.firstName"
        :rules="[rules.required]"
        :error-messages="errorMessages"
        label="Имя"
        placeholder="Иван"
        required
      ></v-text-field>
      <v-text-field
        ref="lastName"
        v-model="newUser.lastName"
        :rules="[rules.required]"
        :error-messages="errorMessages"
        label="Фамилия"
        placeholder="Иванов"
        required
      ></v-text-field>
      <v-select
        ref="sex"
        v-model="newUser.sex"
        :items="sexItems"
        :rules="[rules.required]"
        data-vv-name="select"
        label="Пол"
        required
      ></v-select>
      <v-text-field
        ref="classGroup"
        v-model="newUser.classGroup"
        :rules="[rules.required]"
        :error-messages="errorMessages"
        label="Класс"
        placeholder="5А"
        required
      ></v-text-field>
      <v-text-field
        ref="email"
        v-model="newUser.email"
        :rules="[rules.required, rules.email]"
        label="E-mail"
      ></v-text-field>
    </v-card-text>
    <v-divider class="mt-12"></v-divider>
    <v-card-actions>
      <v-btn color="primary" text @click="close"> Отмена </v-btn>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition>
        <v-tooltip v-if="formHasErrors" left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              class="my-0"
              v-bind="attrs"
              @click="resetForm"
              v-on="on"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          <span>Очистить форму</span>
        </v-tooltip>
      </v-slide-x-reverse-transition>
      <v-btn color="primary" text @click="submit"> Изменить </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    newUser: Object,
  },
  data() {
    return {
      sexItems: ['м', 'ж'],
      rules: {
        required: (value) => !!value || 'Поле обязательно для заполнения.',
        counter: (value) => value.length <= 20 || 'Не более 20 символов',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный формат e-mail'
        },
      },
      errorMessages: '',
      formHasErrors: false,
      serverState: '',
      dialog: false,
    }
  },
  // watch: {
  //   name() {
  //     this.errorMessages = ''
  //   },
  // },
  methods: {
    close() {
      this.$emit('close-dialog', false)
    },
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.newUser).forEach((f) => {
        console.log(f, this.$refs[f])
        this.$refs[f].reset()
      })
    },

    submit() {
      this.formHasErrors = false

      Object.keys(this.newUser).forEach((f) => {
        if (!this.newUser[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })

      if (!this.formHasErrors) {
        const result = {}
        for (const key in this.newUser) {
          result[key] = this.newUser[key]
        }
        this.$emit('update-user', result)
      }
    },
  },
}
</script>

<style></style>
