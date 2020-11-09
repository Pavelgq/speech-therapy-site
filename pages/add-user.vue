<template>
  <v-main>
    <v-container justify-center fluid>
      <v-row justify="center">
        <v-col>
          <v-card ref="form">
            <v-card-text>
              <v-text-field
                ref="firstName"
                v-model="firstName"
                :rules="[
                  () => !!firstName || 'Поле обязательно для заполнения',
                ]"
                :error-messages="errorMessages"
                label="Имя"
                placeholder="Иван"
                required
              ></v-text-field>
              <v-text-field
                ref="lastName"
                v-model="lastName"
                :rules="[() => !!lastName || 'Поле обязательно для заполнения']"
                :error-messages="errorMessages"
                label="Фамилия"
                placeholder="Иванов"
                required
              ></v-text-field>
              <!-- пол -->
              <v-text-field
                ref="schoolClass"
                v-model="schoolClass"
                :rules="[
                  () => !!schoolClass || 'Поле обязательно для заполнения',
                ]"
                :error-messages="errorMessages"
                label="Класс"
                placeholder="5А"
                required
              ></v-text-field>
              <v-text-field
                ref="city"
                v-model="city"
                :rules="[
                  () => !!city || 'This field is required',
                  addressCheck,
                ]"
                label="City"
                placeholder="El Paso"
                required
              ></v-text-field>
              <v-text-field
                ref="state"
                v-model="state"
                :rules="[() => !!state || 'This field is required']"
                label="State/Province/Region"
                required
                placeholder="TX"
              ></v-text-field>
              <v-text-field
                ref="zip"
                v-model="zip"
                :rules="[() => !!zip || 'This field is required']"
                label="ZIP / Postal Code"
                required
                placeholder="79938"
              ></v-text-field>
              <v-autocomplete
                ref="country"
                v-model="country"
                :rules="[() => !!country || 'This field is required']"
                :items="countries"
                label="Country"
                placeholder="Select..."
                required
              ></v-autocomplete>
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn text> Cancel </v-btn>
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
                  <span>Refresh form</span>
                </v-tooltip>
              </v-slide-x-reverse-transition>
              <v-btn color="primary" text @click="submit"> Submit </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
}
</script>

<style></style>
