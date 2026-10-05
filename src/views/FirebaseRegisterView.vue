<template>
  <div class="container mt-5">
    <h1>Firebase Registration</h1>

    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Register
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')

const register = () => {
  const auth = getAuth()

createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        console.log('Successfully registered!')
        console.log(userCredential.user)

    alert('Successfully registered!')
    })
    .catch((error) => {
        console.log(error.code)
        console.log(error.message)

        alert(error.message)
    })
}
</script>