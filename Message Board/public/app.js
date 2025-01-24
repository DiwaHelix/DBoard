let messages = [];
let username = '';

document.getElementById('username-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('username-input');
  username = usernameInput.value.trim();
  
  if (username) {
    document.getElementById('username-form').style.display = 'none';
    document.getElementById('message-form').style.display = 'block';
  }
});

document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value.trim();
  
  if (message && username) {
    addMessage({ username, text: message, timestamp: new Date() });
    messageInput.value = '';
  }
});

function addMessage(message) {
  messages.push(message);
  displayMessages();
  saveMessages();
}

function displayMessages() {
  const messagesList = document.getElementById('messages');
  messagesList.innerHTML = '';
  messages.forEach(function(message) {
    const li = document.createElement('li');
    li.textContent = `${message.username}: ${message.text} (Posted at: ${new Date(message.timestamp).toLocaleString()})`;
    messagesList.appendChild(li);
  });
}

function saveMessages() {
  localStorage.setItem('messages', JSON.stringify(messages));
}

function loadMessages() {
  const savedMessages = JSON.parse(localStorage.getItem('messages'));
  if (savedMessages) {
    messages = savedMessages;
    displayMessages();
  }
}

window.onload = loadMessages;
