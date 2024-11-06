import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageInput, MessageList, Message, Avatar } from "@chatscope/chat-ui-kit-react";
import { getMessages } from "../api/getMessages";
import { postMessage } from "../api/postMessage";
import { jwtDecode } from "jwt-decode";

export interface Message {
  userId: number;
  username: string;
  message: string;
  createdAt: string;
}

export interface FormattedMessage {
    userId: number;
    username: string;
    message: string;
    createdAt: string;
    direction: "outgoing" | "incoming",
    position: "first" | "last" | "single";
}

interface User {
    id: number;
    username: string;
}

const formatMessages = (messages: Message[], currentUserId: number): FormattedMessage[] => {
    return messages.map((message) => {
        const direction = message.userId === currentUserId ? "incoming" : "outgoing";
        const position: "first" = "first";

        return {
            ...message,
            direction,
            position
        };
    });
};

export default function MessagesPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<FormattedMessage[]>([]);
    const [input, setInput] = useState<string>()
    const location = useLocation();
    const chatId = location.state?.chatId;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<{ username: string, userId: number }>(token);
            const body: User = {
                username: decodedToken.username,
                id: decodedToken.userId
            }
            setCurrentUser(body);
        }
    }, []);


    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId && currentUser) {
                try {
                    const result = await getMessages(chatId);
                    const formattedMessages = formatMessages(result, currentUser.id);
                    setMessages(formattedMessages);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            } else {
                console.warn("No chat selected");
            }
        };
        fetchMessages();
    }, [chatId]);

    const handleChange = (innerHtml: string) => {
        console.log(innerHtml)
        setInput(innerHtml); 
    };

    const handleSend = async (innerHtml: string) => {

        if (!innerHtml.trim()) return;
    
        try {
            const response = await postMessage(chatId, innerHtml); 

            const newMessage: FormattedMessage = {
                userId: currentUser?.id ?? 0,
                username: currentUser?.username ?? "Unknown",
                message: innerHtml,
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
        <div style={{ position: "relative", height: "100%" }}>
            <h1>NAME</h1>
            <MainContainer>
                <ChatContainer>       
                    <MessageList>
                        
                        {messages.map((message) => (
                            <Message
                                key={message.createdAt}
                                model={{
                                    message: message.message,
                                    sentTime: message.createdAt,
                                    sender: message.username,
                                    direction: message.direction,
                                    position: message.position
                                }}
                            >
                                <Avatar
                                    name={message.username}
                                    src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
                                />
                            </Message>
                        ))}

                    </MessageList>
                    <MessageInput 
                        value={input}
                        placeholder="Type a message..."
                        onChange={handleChange}
                        onSend={handleSend}
                    />     
                </ChatContainer>
            </MainContainer>
        </div>
    );
}
