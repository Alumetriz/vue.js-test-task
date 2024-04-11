<script setup lang="ts">
import { computed, reactive } from 'vue';
import { required, email, helpers, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useRouter } from 'vue-router';

const user = reactive({
  email: '',
  password: '',
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Электронная почта - обязательное поле.', required),
    email: helpers.withMessage('Некорректная электронная почта.', email),
  },
  password: {
    required: helpers.withMessage('Пароль - обязательное поле.', required),
    minLength: helpers.withMessage('Пароль должен содержать не менее 6 символов.', minLength(6)),
  },
}));

const v$ = useVuelidate(rules.value, user);

const router = useRouter();

const login = () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    router.push({ name: 'game' });
  }
};

type TypeMe = any;
</script>

<template>
  <v-container fluid class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-10 pa-8">
          <v-card-title class="text-h5 text-center mb-6">Вход</v-card-title>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="v$.email.$model"
              :error-messages="v$.email.$errors.map((e: TypeMe) => e.$message)"
              label="Email"
              outlined
              dense
              required
              class="flex md12"
            ></v-text-field>

            <v-text-field
              v-model="v$.password.$model"
              :error-messages="v$.password.$errors.map((e: TypeMe) => e.$message)"
              label="Пароль"
              outlined
              dense
              type="password"
              required
            ></v-text-field>

            <v-btn color="primary" class="white--text mt-6" large elevation="2" @click="login">
              Войти
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100%;
}

.align-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.pa-8 {
  padding: 32px !important;
}

.text-h5 {
  font-size: 1.5rem;
  font-weight: bold;
}

.elevation-10 {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.v-text-field {
  width: 100%;
  margin: 15px 0;
}

.v-btn {
  width: 100%;
}

.error-message {
  color: red;
  overflow: hidden;
}
</style>
