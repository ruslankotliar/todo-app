import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'todo-app-5f8ad.firebaseapp.com',
  projectId: 'todo-app-5f8ad',
  storageBucket: 'todo-app-5f8ad.appspot.com',
  messagingSenderId: '979544141238',
  appId: '1:979544141238:web:698357f4ba4d3a7ae3a517'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
