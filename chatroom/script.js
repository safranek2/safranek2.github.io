const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const firebaseConfig = {
    apiKey: "AIzaSyC6IvcL_jzTZvpT8Jg6AVdJEEn7u5Ay4FA",
    authDomain: "chatroom-df69f.firebaseapp.com",
    projectId: "chatroom-df69f",
    storageBucket: "chatroom-df69f.appspot.com",
    messagingSenderId: "98215758452",
    appId: "1:98215758452:web:2a1c251fbe8ac6ccc29f21",
    measurementId: "G-N5MEMETX4S"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;

const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

sendButton.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        firebase.database().ref("messages").push({
            text: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        messageInput.value = "";
    }
});

firebase.database().ref("messages").on("child_added", (snapshot) => {
    const messageData = snapshot.val();
    const messageDiv = document.createElement("div");
    messageDiv.textContent = messageData.text;
    chat.appendChild(messageDiv);
});