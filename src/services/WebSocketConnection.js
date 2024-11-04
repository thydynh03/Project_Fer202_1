// WebSocketConnection.js
let ws;
let userName = '';

// Function to initialize WebSocket connection
const initializeWebSocket = () => {
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('Connected to server');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received from server:', data);

        // Handle messages from server
        if (data.type === 'error') {
            alert(data.message);
        }

        if (data.type === 'success') {
            document.getElementById('nameForm').style.display = 'none';
            document.getElementById('chat').style.display = 'block';
        }

        if (data.type === 'serverMessage') {
            displayServerMessage(data);
        }

        if (data.type === 'chat') {
            displayChatMessage(data);
        }
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
    };
};

// Function to send user name
const submitName = (name) => {
    userName = name;
    ws.send(JSON.stringify({ type: 'setName', name: userName }));
};

// Function to send a chat message
const sendMessage = (message) => {
    if (message.trim() !== '') {
        ws.send(JSON.stringify({ type: 'chat', text: message }));
    }
};

// Display server messages (e.g., user joined or left)
const displayServerMessage = (data) => {
    const messagesDiv = document.getElementById('messages');
    const messageToShow = data.name === userName ? `You ${data.message}` : `${data.name} ${data.message}`;
    messagesDiv.innerHTML += `<p class="server-message">${messageToShow}</p>`;
    scrollToBottom(messagesDiv);
};

// Display chat messages from users
const displayChatMessage = (data) => {
    const messagesDiv = document.getElementById('messages');
    const displayName = data.sender === userName ? 'You' : data.sender;
    messagesDiv.innerHTML += `<p><strong>${displayName}:</strong> ${data.message}</p>`;
    scrollToBottom(messagesDiv);
};

// Auto-scroll to the latest message
const scrollToBottom = (messagesDiv) => {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

// Export necessary functions
export { initializeWebSocket, submitName, sendMessage };
