<template>
  <div class="container">
    <div>
      <Logo />
      <div>
        <b-form class="login" @submit="onSubmit" @submit.prevent="login">
          <h1>Вход</h1>
          <b-form-group
            id="input-group-1"
            label-for="input-email"
            description="Формат логина lastname-12345"
          >
            <b-form-input
              id="input-login"
              v-model="form.email"
              type="email"
              required
              placeholder="Введите логин"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label-for="input-password">
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              required
              placeholder="Введите пароль"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </div>
  </div>
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
    }
  },
  methods: {
    ...mapActions({
      authRequest: 'auth/AUTH_REQUEST',
    }),
    onSubmit(evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
    },
    login() {
      const { email, password } = this.form
      // console.log(this.$store, this.authRequest, mapActions)
      this.authRequest({ email, password }).then(() => {
        this.$router.push('/room')
      })
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
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
