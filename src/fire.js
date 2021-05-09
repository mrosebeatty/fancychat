import firebase from 'firebase'
const firebaseConfig = {
        apiKey: "AIzaSyC6Ue3EpxdBpoxb3V-Jd7NqOCHOBeZw3zo",
        authDomain: "chat-26c3e.firebaseapp.com",
        databaseURL: "https://chat-26c3e-default-rtdb.firebaseio.com",
        projectId: "chat-26c3e",
        storageBucket: "chat-26c3e.appspot.com",
        messagingSenderId: "679511844823",
        appId: "1:679511844823:web:1d15edec0cc75e76d20d92",
        measurementId: "G-X37X6Z8FW7"
      };
      // Initialize Firebase
      const firebaseApp = firebase.initializeApp(firebaseConfig);
      export const auth = firebaseApp.auth()
      export const messageRef = firebaseApp.database().ref('messages')
    export default firebaseApp

    
