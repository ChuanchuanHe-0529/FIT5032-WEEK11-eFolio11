<template>
  <div class="mt-5">
    <h2>Books with ISBN > 1000</h2>

    <ul>
      <li
        v-for="book in books"
        :key="book.id"
      >
        {{ book.name }} (ISBN: {{ book.isbn }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'

import { db } from '@/firebase/init'

const books = ref([])

const getBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000)
    )

    const querySnapshot = await getDocs(q)

    books.value = []

    querySnapshot.forEach((doc) => {
      books.value.push({
        id: doc.id,
        ...doc.data()
      })
    })
  } catch (error) {
    console.error('Error getting books:', error)
  }
}

onMounted(() => {
  getBooks()
})
</script>