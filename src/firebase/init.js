import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjWHFi8UnnhWen5jouh04xePSARdxXdrY',
  authDomain: 'fit5032-library-4fea5.firebaseapp.com',
  projectId: 'fit5032-library-4fea5',
  storageBucket: 'fit5032-library-4fea5.firebasestorage.app',
  messagingSenderId: '851619264903',
  appId: '1:851619264903:web:03d23048a0ebc495b3fb22'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(firebaseApp)

export { db }
export default firebaseApp