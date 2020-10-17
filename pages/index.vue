<template>
  <v-container fill-height fluid>
    <v-row :align="center" :justify="center">
      <v-col>
        <v-form
          ref="form"
          v-model="valid"
          @submit="onSubmit"
          @submit.prevent="login"
        >
          <h2>Вход</h2>
          <v-text-field
            v-model="form.email"
            :rules="rules.emailRules"
            label="E-mail"
            required
            @keypress.enter.prevent="login"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Пароль"
            hint="Минимум 7 символов"
            counter
            @click:append="show1 = !show1"
            @keypress.enter.prevent="login"
          ></v-text-field>
          <v-btn
            rounded
            :disabled="!valid"
            color="normal"
            class="mr-4"
            @click="validate"
          >
            Войти
          </v-btn>
          <v-btn rounded color="red darken-3" class="mr-4" @click="reset">
            Очистить
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <p class="font-weight-regular">{{ serverState }}</p>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show1: false,
      valid: true,
      rules: {
        emailRules: [
          (v) => !!v || 'Введите email',
          (v) => /.+@.+/.test(v) || 'Неверный формат email',
        ],
        required: (value) => !!value || 'Заполните все поля',
        min: (v) =>
          v !== undefined ? v.length >= 7 : '' || 'Минимум 7 символов',
        emailMatch: () => 'Email или пароль не совпадают',
      },
      serverState: '',
    }
  },
  methods: {
    ...mapActions({
      authRequest: 'auth/AUTH_REQUEST',
    }),
    onSubmit(evt) {
      evt.preventDefault()
    },
    login() {
      const { email, password } = this.form
      this.authRequest({ email, password })
        .then(() => {
          this.$router.push('/room')
          this.serverState = ''
        })
        .catch((e) => {
          this.serverState = 'Сервер не отвечает, попробуйте позже'
        })
    },
    validate() {
      this.$refs.form.validate()
      if (this.valid) {
        this.login()
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  },
}
</script>

<style>
.container {
  /* margin: 0 auto;
  min-height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
