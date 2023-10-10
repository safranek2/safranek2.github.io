import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

let firebaseConfig = {
    apiKey: "AIzaSyC6IvcL_jzTZvpT8Jg6AVdJEEn7u5Ay4FA",
    authDomain: "chatroom-df69f.firebaseapp.com",
    databaseURL: "https://chatroom-df69f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatroom-df69f",
    storageBucket: "chatroom-df69f.appspot.com",
    messagingSenderId: "98215758452",
    appId: "1:98215758452:web:2a1c251fbe8ac6ccc29f21",
    measurementId: "G-N5MEMETX4S"
};

let firebaseApp = initializeApp(firebaseConfig);
let database = getDatabase(firebaseApp);

document.getElementById("message").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      document.getElementById("send").click();
    }
  });

document.getElementById("send").addEventListener("click", function () {
    let timestamp = Date.now();
    let message = document.getElementById("message").value;
    if (message.trim() !== "") {
        let newMessageRef = push(ref(database, "messages"));
        set(newMessageRef, {
            timestamp: timestamp,
            message: message
        })
            .then(function () {
                console.log("Message saved successfully!");
                document.getElementById("message").value = "";
            })
            .catch(function (error) {
                console.error("Error: Message not saved -", error);
            });
    } else {
        console.error("Error: Message is empty!");
    }
});

let chat = document.getElementById("chat");
let lastLoad = 0;
let messageIndex = 0;

function loadNewMessages() {
    let messagesRef = ref(database, "messages");
    onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
            let allMessages = snapshot.val();
            let messagesArray = [];
            for (let key in allMessages) {
                if (allMessages.hasOwnProperty(key)) {
                    let messageData = allMessages[key];
                    let timestamp = messageData.timestamp;
                    if (timestamp > lastLoad) {
                        let messageText = messageData.message;
                        messagesArray.push({
                            timestamp: timestamp,
                            message: messageText
                        });
                    }
                }
            }
            messagesArray.sort((a, b) => a.timestamp - b.timestamp);
            messagesArray.forEach((message) => {
                let messageClass = (messageIndex % 2 === 0) ? "" : "bg-dark"
                messageIndex++;
                chat.innerHTML += `
                <div class="${messageClass} p-3">
                    <div>
                        ${new Date(message.timestamp).toLocaleString()}
                    </div>
                    <div>
                    ${message.message}
                    </div>
                </div>
            `;
            });
            if (messagesArray.length > 0) {
                lastLoad = messagesArray[messagesArray.length - 1].timestamp;
                chat.scrollTop = chat.scrollHeight;
            }
        }
    });
}

setInterval(loadNewMessages, 1000);
