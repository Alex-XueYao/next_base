// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDnUF0PfChmtpzeITIqb7pMElAzAtMIT2s',
	authDomain: 'next-firebase-da840.firebaseapp.com',
	projectId: 'next-firebase-da840',
	storageBucket: 'next-firebase-da840.appspot.com',
	messagingSenderId: '584773772448',
	appId: '1:584773772448:web:418ce88a99d339b0d215c5',
	measurementId: 'G-JLVQKY3QL4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
