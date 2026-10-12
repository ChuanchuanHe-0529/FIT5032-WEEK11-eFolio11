<template>
  <div class="container mt-4">
    <div class="header">
      <h1>WEATHER APP</h1>

      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
          @keyup.enter="searchByCity"
        />

        <button
          @click="searchByCity"
          class="search-button"
        >
          Search
        </button>
      </div>
    </div>

    <main>
      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <div v-if="weatherData" class="weather-info">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>

        <div>
          <img
            :src="iconUrl"
            alt="Weather Icon"
            class="weather-icon"
          />

          <p class="temperature">
            {{ temperature }} °C
          </p>
        </div>

        <span class="description">
          {{ weatherData.weather[0].description }}
        </span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY

const city = ref('')
const weatherData = ref(null)
const errorMessage = ref('')

const temperature = computed(() => {
  return weatherData.value
    ? Math.round(weatherData.value.main.temp)
    : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`
    : null
})

const fetchWeatherData = async (url) => {
  try {
    errorMessage.value = ''

    const response = await axios.get(url)

    weatherData.value = response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)

    weatherData.value = null

    if (error.response?.status === 404) {
      errorMessage.value = 'City not found.'
    } else {
      errorMessage.value = 'Unable to retrieve weather data.'
    }
  }
}

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        const url =
          `https://api.openweathermap.org/data/2.5/weather` +
          `?lat=${latitude}` +
          `&lon=${longitude}` +
          `&appid=${apikey}` +
          `&units=metric`

        await fetchWeatherData(url)
      },

      (error) => {
        console.error('Location error:', error)
        errorMessage.value = 'Unable to get current location.'
      }
    )
  }
}

const searchByCity = async () => {
  if (!city.value.trim()) {
    errorMessage.value = 'Please enter a city name.'
    return
  }

  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city.value.trim())}` +
    `&appid=${apikey}` +
    `&units=metric`

  await fetchWeatherData(url)
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped>
.container {
  text-align: center;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.search-input {
  width: 300px;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #888;
}

.search-button {
  padding: 10px 20px;
  font-size: 18px;
  border: 1px solid #888;
  cursor: pointer;
}

.weather-info {
  margin-top: 20px;
}

.weather-info h2 {
  font-size: 2rem;
}

.weather-icon {
  width: 100px;
  height: 100px;
}

.temperature {
  font-size: 1.5rem;
}

.description {
  font-size: 1.4rem;
  text-transform: capitalize;
}

.error-message {
  color: red;
  font-size: 1.1rem;
}
</style>