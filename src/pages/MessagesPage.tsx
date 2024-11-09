import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MessageList, Message, Avatar } from "@chatscope/chat-ui-kit-react";
import { getMessages } from "../api/getMessages";
import { postMessage } from "../api/postMessage";
import { jwtDecode } from "jwt-decode";
import { MessageModel } from "../models/MessageModel";
import { UserModel } from "../models/UserModel";
import ChatHeader from "../components/ChatHeader";
import MessagesInput from "../components/MessageInput";
import { Typography } from "@mui/material";

export interface FormattedMessage {
    userId: number;
    username: string;
    message: string;
    createdAt: string;
    direction: "outgoing" | "incoming";
    position: "first" | "last" | "single";
}

interface MessagePageState {
    chatId: number;
    username: string;
    avatar: string
}

const formatMessages = (messages: MessageModel[], currentUserId: number): FormattedMessage[] => {
    return messages.map((message) => {
        const direction = message.userId === currentUserId ? "outgoing" : "incoming";
        const position: "single" = "single";

        return {
            ...message,
            direction,
            position
        };
    });
};

export default function MessagesPage() {
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
    const [messages, setMessages] = useState<FormattedMessage[]>([]);
    const [input, setInput] = useState<string>("");
    const location = useLocation();
    const { chatId, username, avatar } = location.state as MessagePageState || {};

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<{ username: string, userId: number }>(token);
            const body: UserModel = {
                username: decodedToken.username,
                userId: decodedToken.userId
            }
            setCurrentUser(body);
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId && currentUser) {
                try {
                    const result = await getMessages(chatId);
                    const formattedMessages = formatMessages(result, currentUser.userId);
                    setMessages(formattedMessages);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            } else {
                console.warn("No chat selected");
            }
        };
        fetchMessages();
        const interval = setInterval(() => {
            fetchMessages();
          }, 5000);
        
          return () => clearInterval(interval);
    }, [chatId, currentUser]);

    const handleSend = async () => {
        if (!input.trim()) return;

        try {
            await postMessage(chatId, input);

            const newMessage: FormattedMessage = {
                userId: currentUser?.userId ?? 0,
                username: currentUser?.username ?? "Unknown",
                message: input,
                createdAt: new Date().toISOString(),
                direction: "outgoing",
                position: "last",
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            margin: 0,
            padding: 0
        }}>
            <div>
                <ChatHeader username={username} avatar={avatar}/>
            </div>
            
            <div style={{
                flexGrow: 1,
                overflow: 'auto',
            }}>
                <MessageList 
                style={{
                    backgroundColor: 'transparent', 
                }}
            >
                {messages.map((message) => (<>
                    <Message
                        key={message.createdAt}
                        model={{
                            message: message.message,
                            sentTime: message.createdAt,
                            sender: message.username,
                            direction: message.direction,
                            position: message.position,
                        }}
                    >
                        {message.userId !== currentUser?.userId && (
                            <Avatar
                                name={message.username}
                                src={`http://localhost:5002${avatar}`}
                            />
                        )}
                    </Message>
                    </>
                ))}
                </MessageList>
            </div>

            <div style={{
                minHeight: '50px',
                flexShrink: 0,
            }}>
                <MessagesInput
                    input={input}
                    setInput={setInput}
                    handleSend={handleSend}
                />
            </div>

            {/* Scrollbar styling */}
            <style>
                {`
                    /* Style the scrollbar */
                    ::-webkit-scrollbar {
                    width: 6px; /* Width of the scrollbar */
                    height: 6px; /* Height of the scrollbar for horizontal scrolling */
                    }

                    /* Style the thumb (draggable part of the scrollbar) */
                    ::-webkit-scrollbar-thumb {
                    background-color: rgba(0, 0, 0, 0.3); /* Darker thumb */
                    border-radius: 10px; /* Rounded corners */
                    }

                    /* Style the track (background of the scrollbar) */
                    ::-webkit-scrollbar-track {
                    background-color: rgba(0, 0, 0, 0.1); /* Light track */
                    border-radius: 10px; /* Rounded corners */
                    }

                    /* Firefox */
                    html {
                    scrollbar-width: thin; /* Thin scrollbar */
                    scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1); /* thumb and track colors */
                    }
                `}
            </style>

        </div>
    ); 
}
