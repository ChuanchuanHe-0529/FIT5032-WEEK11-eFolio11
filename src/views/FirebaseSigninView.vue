<template>
  <div class="container mt-5">
    <h1>Firebase Sign In</h1>

    <form @submit.prevent="signIn">
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
        Sign In
      </button>
    </form>

    <div v-if="message" class="alert alert-info mt-3">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

const email = ref('')
const password = ref('')
const message = ref('')

const auth = getAuth()

const signIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      message.value = `Successfully signed in as ${userCredential.user.email}`

      console.log('Successfully signed in!')
      console.log(userCredential.user)
    })
    .catch((error) => {
      message.value = `Sign in failed: ${error.code}`

      console.log(error.code)
      console.log(error.message)
    })
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Current user:', user)
  } else {
    console.log('No user is currently signed in.')
  }
})
</script>