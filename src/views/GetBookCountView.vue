<template>
  <div class="container mt-4">
    <h1>Book Counter</h1>

    <button class="btn btn-primary" @click="getBookCount">
      Get Book Count
    </button>

    <p v-if="count !== null" class="mt-3">
      Total number of books: {{ count }}
    </p>

    <p v-if="error" class="mt-3">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get('https://us-central1-fit5032-library-4fea5.cloudfunctions.net/countBooks')

    count.value = response.data.count
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = 'Error getting book count'
  }
}
</script>