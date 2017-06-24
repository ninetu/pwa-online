import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyCu5dsqmkcIjHAV9V4hWCAO9vy7IYYXw_s',
  authDomain: 'pwa-online.firebaseapp.com',
  databaseURL: 'https://pwa-online.firebaseio.com',
  projectId: 'pwa-online',
  storageBucket: 'pwa-online.appspot.com',
  messagingSenderId: '199988461481'
}
const firebaseApp = firebase.initializeApp(config)
export default firebaseApp
