// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDCPLaHmq01V8CG4wg0jMpEZ0i9aAzfFVM',
  authDomain: 'todo-app-e5bb4.firebaseapp.com',
  projectId: 'todo-app-e5bb4',
  storageBucket: 'todo-app-e5bb4.appspot.com',
  messagingSenderId: '876689789964',
  appId: '1:876689789964:web:90df1196863a38d32eca29',
  measurementId: 'G-G0VFN66530'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
