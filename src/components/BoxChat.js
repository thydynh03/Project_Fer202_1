// BoxChat.js
import React, { useEffect } from 'react';
import { initializeWebSocket, submitName, sendMessage } from '../services/WebSocketConnection'; // Adjust the path as needed

const BoxChat = () => {
    useEffect(() => {
        initializeWebSocket(); // Khởi tạo WebSocket khi component được mount
    }, []);

    const handleSubmitName = (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        submitName(nameInput.value);
        nameInput.value = ''; // Xóa giá trị sau khi gửi
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message');
        sendMessage(messageInput.value);
        messageInput.value = ''; // Xóa giá trị sau khi gửi
    };

    return (
        <div>
            <h1>Welcome to Box Chat</h1>
            <form onSubmit={handleSubmitName}>
                <input id="name" type="text" placeholder="Enter your name" />
                <button type="submit">Submit</button>
            </form>
            <div id="chat">
                <div id="messages" style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', marginBottom: '10px' }}></div>
                <form onSubmit={handleSendMessage}>
                    <input id="message" type="text" placeholder="Type a message" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default BoxChat;
