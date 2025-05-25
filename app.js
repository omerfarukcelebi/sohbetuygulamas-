// Firebase konfigürasyonu - TEK BİR TANIM OLMALI
const firebaseConfig = {
  apiKey: "AIzaSyCdzv7S9Coa82GXLa4QtQ1KtSR8B-1gH5k",
  authDomain: "sohbetteknofsm.firebaseapp.com",
  databaseURL: "https://sohbetteknofsm-default-rtdb.firebaseio.com",
  projectId: "sohbetteknofsm",
  storageBucket: "sohbetteknofsm.firebasestorage.app",
  messagingSenderId: "270159661029",
  appId: "1:270159661029:web:62f3ce41c28456fc24510c",
  measurementId: "G-RLVRB2TXT1"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let username;
const messagesRef = database.ref('messages');

// Kullanıcı adı sor
while (!username) {
    username = prompt("Lütfen kullanıcı adınızı girin:");
}

document.getElementById('user-info').innerHTML = `
    <p>Hoş geldin, ${username}!</p>
`;

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        const timestamp = Date.now();
        messagesRef.push({
            username: username,
            text: message,
            timestamp: timestamp
        });
        messageInput.value = '';
    }
}

// Mesajları dinle
messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
});

// Mesajları görüntüle
function displayMessage(message) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    const date = new Date(message.timestamp);
    const timeString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    
    messageElement.innerHTML = `
        <div class="username">${message.username}</div>
        <div class="text">${message.text}</div>
        <div class="timestamp">${timeString}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Enter tuşu ile gönderme
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});