import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MessageList, Message, Avatar, MessageGroup } from "@chatscope/chat-ui-kit-react";
import { jwtDecode } from "jwt-decode";
import { ChatModel } from "../models/ChatModel";
import { getMessages } from "../api/MessagesAPI/getMessages";
import { postMessage } from "../api/MessagesAPI/postMessage";
import { MessageModel } from "../models/MessageModel";
import ChatHeader from "../components/MessagePage/ChatHeader";
import MessagesInput from "../components/MessagePage/MessageInput";
import { getUsernameAvatar } from "../api/getUsernameAvatar";
import { Typography } from "@mui/material";
import { convertISODate } from "../utils/convertISODate";

export default function MessagesPage() {
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [currentUsername, setCurrentUsername] = useState<string | null>(null);
    const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [input, setInput] = useState<string>("");
    const location = useLocation();
    const { body } = location.state as { body: ChatModel };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<{ userId: number }>(token);
            setCurrentUserId(decodedToken.userId);
        }
    }, []);

    useEffect(() => {
        const fetchUsername = async () => {
            const result = await getUsernameAvatar();
            setCurrentUsername(result.username);
            setCurrentUserAvatar(result.avatar);
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            if (body.chatId) {
                try {
                    const result = await getMessages(body.chatId);
                    setMessages(result);
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
    }, [body.chatId]);

    const handleSend = async () => {
        if (!input.trim()) {console.log('1'); return}
        if (!currentUserId ) {console.log('2'); return}
        if (!currentUsername) {console.log('3'); return}

        try {
            await postMessage(body.chatId, input);

            const newMessage: MessageModel = {
                userId: currentUserId,
                username: currentUsername,
                avatar: currentUserAvatar,
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

    function messageFooter(isGroupChat: boolean, userId: number, currentUserId: number | null, username: string, time: string): string {
        let footer = ''
        let formattedTime = convertISODate(time)
        if (isGroupChat) {
            if (userId !== currentUserId) footer += (username+' ')
            footer += formattedTime
        } else {
            footer += formattedTime
        }
        return footer
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            margin: 0,
            padding: 0
        }}>
            <div>
                <ChatHeader body={body}/>
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
                    <MessageGroup direction={message.direction} sender={message.username} sentTime={message.createdAt}>
                    <MessageGroup.Messages>
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
                        {message.userId !== currentUserId && (
                            <Avatar
                                name={message.username}
                                src={message.avatar ? `http://localhost:5002${message.avatar}` : `https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg`}
                            />
                        )}
                    </Message>
                    </MessageGroup.Messages>
                    <MessageGroup.Footer>
                        <Typography sx={{color: 'white', fontSize: 12, opacity: 0.5}}>
                            {messageFooter(body.isGroupChat, message.userId, currentUserId, message.username, message.createdAt)}
                        </Typography>
                    </MessageGroup.Footer>
                    </MessageGroup>
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
