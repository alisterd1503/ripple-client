import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import SendMessage from "../SendMessage";

export interface Message {
    userId: number,
    username: string,
    message: string,
    createdAt: string,
}

export default function MessagesPage () {
    const [messages, setMessages] = useState<Message[]>([]);
    const location = useLocation();
    const chatId = location.state?.chatId;

    useEffect(() => {
        if (chatId) {
            fetchMessages(Number(chatId));
        }
    }, [chatId]);

    const fetchMessages = async (chatId: number) => {
        try {
            const response = await axios.get(`http://localhost:5002/api/getMessages?chatId=${chatId}`);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    return (
        <div>
            <h2>MESSAGES:</h2>

            <div style={{border: 'solid white 2px'}}>
                {messages.map((message) => (
                    <div key={message.userId}>{message.username}: {message.message}</div>
                ))}
            </div>
            <SendMessage chatId={chatId}/>
        </div>
    );
};

