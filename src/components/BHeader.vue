<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  const auth = getAuth()

  signOut(auth)
    .then(() => {
      console.log('User signed out successfully.')
      console.log('Current user:', auth.currentUser)

      router.push('/firebase-signin')
    })
    .catch((error) => {
      console.log('Logout error:', error.code)
      console.log(error.message)
    })
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">

        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            active-class="active"
            aria-current="page"
          >
            Home (Week 5)
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/firebase-signin"
            class="nav-link"
            active-class="active"
          >
            Firebase Sign In
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/firebase-register"
            class="nav-link"
            active-class="active"
          >
            FireRegister
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/add-book"
            class="nav-link"
            active-class="active"
          >
            Add Book
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/get-book-count"
            class="nav-link"
            active-class="active"
          >
            Book Counter
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/current-weather"
            class="nav-link"
            active-class="active"
          >
            Current Weather
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/WeatherCheck"
            class="nav-link"
            active-class="active"
          >
            Get Weather
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/CountBookAPI"
            class="nav-link"
            active-class="active"
          >
            Count Book API
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/GetAllBookAPI"
            class="nav-link"
            active-class="active"
          >
            Get All Book API
          </router-link>
        </li>

        <li class="nav-item">
          <button
            class="nav-link btn btn-link"
            @click="logout"
          >
            Log Out
          </button>
        </li>

      </ul>
    </header>
  </div>
</template>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>