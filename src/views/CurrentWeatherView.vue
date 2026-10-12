<template>
  <div class="container mt-4">
    <h2>Current Location Weather</h2>

    <p v-if="loading">Loading weather...</p>

    <div v-else-if="weather">
      <h4>{{ weather.name }}</h4>
      <p>Temperature: {{ weather.main.temp }} °C</p>
      <p>Weather: {{ weather.weather[0].description }}</p>
    </div>

    <p v-if="error" class="text-danger">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const weather = ref(null)
const loading = ref(true)
const error = ref('')

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

console.log('API key loaded:', !!apiKey)
console.log('API key length:', apiKey?.length)

const getCurrentWeather = () => {
  if (!navigator.geolocation) {
    error.value = 'Geolocation is not supported by this browser.'
    loading.value = false
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: apiKey,
              units: 'metric'
            }
          }
        )

        weather.value = response.data
      } catch (err) {
        console.error(err)
        error.value = 'Unable to get weather data.'
      } finally {
        loading.value = false
      }
    },

    (err) => {
      console.error(err)
      error.value = 'Unable to get your current location.'
      loading.value = false
    }
  )
}

onMounted(() => {
  getCurrentWeather()
})
</script>