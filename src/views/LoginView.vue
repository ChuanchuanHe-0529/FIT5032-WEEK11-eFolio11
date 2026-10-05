<script setup>
import { isAuthenticated } from '../auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const handleLogin = () => {
  if (username.value === 'admin' && password.value === '123456') {
    isAuthenticated.value = true
    errorMessage.value = ''
    router.push('/about')
  } else {
    errorMessage.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Login</h1>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>

        <input
          id="username"
          type="text"
          class="form-control"
          v-model="username"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>

        <input
          id="password"
          type="password"
          class="form-control"
          v-model="password"
        />
      </div>

      <div v-if="errorMessage" class="text-danger mb-3">
        {{ errorMessage }}
      </div>

      <button type="submit" class="btn btn-primary">
        Login
      </button>
    </form>
  </div>
</template>