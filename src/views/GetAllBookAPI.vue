<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)

const getAllBookAPI = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-library-4fea5.cloudfunctions.net/getAllBooks'
    )

    jsondata.value = JSON.stringify(response.data, null, 2)
    error.value = null
  } catch (err) {
    console.error(err)

    error.value = 'Error fetching all books'
    jsondata.value = null
  }
}

onMounted(() => {
  getAllBookAPI()
})
</script>