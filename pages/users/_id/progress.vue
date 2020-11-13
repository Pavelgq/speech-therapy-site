<template>
  <v-main>
    <v-container justify-center fluid>
      <v-btn class="ma-2" color="primary" dark @click="dialogUpdate = true">
        Изменить<v-icon dark right> mdi-wrench </v-icon>
      </v-btn>

      <v-btn class="ma-2" color="red" dark @click="dialogDelete = true">
        Удалить
        <v-icon dark right> mdi-cancel </v-icon>
      </v-btn>
      <v-flex tag="section">
        <v-row>
          <v-col>
            <UserInfo v-if="status === 'success'" :data="getUserData" />
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <UserProgress v-if="status === 'success'" :data="getUserData" />
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <UserStatistic
              v-if="statusLessons === 'success'"
              :data="currentLessons"
            />
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </v-col>
        </v-row>
      </v-flex>
    </v-container>
    <v-dialog v-model="dialogUpdate" persistent max-width="400px">
      <AddUser
        :new-user="getUserUpdate"
        @close-dialog="dialogUpdate = false"
        @update-user="updateUser"
      />
    </v-dialog>
    <v-dialog v-model="dialogDelete" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline">
          Вы уверены, что хотите удалить пользователя?
        </v-card-title>
        <v-btn color="green darken-1" text @click="deleteUser"> Да </v-btn>
        <v-btn color="green darken-1" text @click="dialogDelete = false">
          Отмена
        </v-btn>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddUser from '@/components/admin/AddUser'
export default {
  layout: 'dashboard',
  // validate({ params }) {
  //   return /^([0-9]{12,12})$/.test(params.id)
  // },
  components: {
    AddUser,
  },
  data() {
    return {
      id: '',
      dialogDelete: false,
      dialogUpdate: false,
    }
  },
  created() {
    console.log(this)
    this.id = this.$route.params.id
    if (this.usersList[this.id]) {
      this.getStat()
    } else {
      this.$router.push('/all-users')
    }
  },
  computed: {
    ...mapState('admin', ['status', 'usersList']),
    ...mapState('statistic', ['statusLessons', 'currentLessons']),
    getUserData() {
      return this.usersList[this.id]
    },
    getUserUpdate() {
      return {
        firstName: this.usersList[this.id].firstName,
        lastName: this.usersList[this.id].lastName,
        email: this.usersList[this.id].email,
        sex: this.usersList[this.id].sex,
        classGroup: this.usersList[this.id].classGroup,
      }
    },
  },
  middleware: 'refresh',
  methods: {
    ...mapActions({
      lessonRequest: 'statistic/LESSON_USER_REQUEST',
      updateTarget: 'admin/USER_UPDATE',
      deleteTarget: 'admin/USER_DELETE',
    }),
    getStat() {
      this.lessonRequest(this.id).catch((e) => {
        console.log(e)
      })
    },
    updateUser(obj) {
      obj.id = this.id
      this.updateTarget(obj).then(() => {
        this.dialogUpdate = false
      })
    },
    deleteUser() {
      this.deleteTarget(this.id)
      this.dialogDelete = false
      this.$router.push('/all-users')
    },
  },
}
</script>

<style></style>
