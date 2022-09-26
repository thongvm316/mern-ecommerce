import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA8SKtsPXKA-R6cIdPu3rC6UjkGZ8HwWzw',
  authDomain: 'mern-ecommerce-baaf4.firebaseapp.com',
  projectId: 'mern-ecommerce-baaf4',
  storageBucket: 'mern-ecommerce-baaf4.appspot.com',
  messagingSenderId: '1068128690773',
  appId: '1:1068128690773:web:bb25c3785198b803f92adc',
}

const app = firebase.initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
