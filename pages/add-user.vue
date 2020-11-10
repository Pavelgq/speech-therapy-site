<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col>
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
                ref="schoolClass"
                v-model="newUser.schoolClass"
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
              <v-btn color="primary" text @click="submit"> Создать </v-btn>
            </v-card-actions>
          </v-card>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
              <v-card-title class="headline">
                Пользователь создан успешно
              </v-card-title>
              <v-card-text>
                <p>Email: {{ newUser.email }}</p>
                <p>Пароль: {{ newUser.password }}</p>
              </v-card-text>
              <v-btn color="green darken-1" text @click="dialog = false">
                ОК
              </v-btn>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
const generator = require('generate-password')

export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        sex: '',
        schoolClass: '',
      },
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
  watch: {
    name() {
      this.errorMessages = ''
    },
  },
  methods: {
    ...mapActions({
      addUser: 'admin/USER_ADD',
    }),
    resetForm() {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.newUser).forEach((f) => {
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
        this.newUser.login = `${this.newUser.firstName}${this.newUser.lastName}${this.newUser.schoolClass}`
        this.newUser.password = generator.generate({
          length: 7,
          numbers: true,
        })
        this.addUser(this.newUser)
          .then((res) => {
            this.dialog = true
            this.serverState = ''
          })
          .catch((e) => {
            this.serverState = 'Сервер не отвечает, попробуйте позже'
          })
      }
    },
  },
}
</script>

<style></style>
