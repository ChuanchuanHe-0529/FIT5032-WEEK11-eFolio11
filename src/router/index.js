
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import CurrentWeatherView from '../views/CurrentWeatherView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPI from '../views/GetAllBookAPI.vue'

import { getAuth } from 'firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },

  {
    path: '/firebase-signin',
    name: 'FirebaseSignin',
    component: FirebaseSigninView
  },

  {
    path: '/firebase-register',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },

  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },

  {
    path: '/add-book',
    name: 'AddBook',
    component: AddBookView
  },

  {
    path: '/get-book-count',
    name: 'GetBookCount',
    component: GetBookCountView
  },

  {
    path: '/current-weather',
    name: 'CurrentWeather',
    component: CurrentWeatherView
  },

  {
    path: '/WeatherCheck',
    name: 'GetWeather',
    component: WeatherView
  },

  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },

  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()

  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/firebase-signin')
  } else {
    next()
  }
})

export default router
