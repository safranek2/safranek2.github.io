import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC6IvcL_jzTZvpT8Jg6AVdJEEn7u5Ay4FA",
    authDomain: "chatroom-df69f.firebaseapp.com",
    databaseURL: "https://chatroom-df69f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatroom-df69f",
    storageBucket: "chatroom-df69f.appspot.com",
    messagingSenderId: "98215758452",
    appId: "1:98215758452:web:2a1c251fbe8ac6ccc29f21",
    measurementId: "G-N5MEMETX4S"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.getElementById('send').addEventListener('click', function () {
    var timestamp = Date.now();
    var message = document.getElementById('message').value;
    if (message.trim() !== "") {
        var newMessageRef = database.ref('messages').push();
        newMessageRef.set({
            timestamp: timestamp,
            message: message
        }, function (error) {
            if (error) {
                console.log('Error: Data saved unsuccessfully!');
            } else {
                document.getElementById('message').value = '';
                console.log('Data saved successfully!');
            }
        });
    }
});