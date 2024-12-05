import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MessageList, Message, Avatar, MessageGroup, MessageSeparator } from "@chatscope/chat-ui-kit-react";
import { jwtDecode } from "jwt-decode";
import { getMessages } from "../api/MessagesAPI/getMessages";
import { MessageModel } from "../models/MessageModel";
import ChatHeader from "../components/MessagePage/ChatHeader";
import MessagesInput from "../components/MessagePage/MessageInput";
import { getUsernameAvatar } from "../api/getUsernameAvatar";
import { Box, Popover, Stack, Typography } from "@mui/material";
import { convertISODate } from "../utils/convertISODate";
import TickIcon from '@mui/icons-material/Done';
import React from "react";
const API_URL = `${process.env.REACT_APP_API_URL}`;

interface ReadBy {
    username: string;
    time: string;
}

function PopupReceipt({receipts}:{receipts: ReadBy[]}) {
    return (
        <Box component="section" sx={{ p: 2, fontSize: 20}}>
            <Typography>Read By:</Typography>
            {receipts.map((receipt, index) => (
                <Typography key={index} sx={{fontSize: 15}}>{`${receipt.username} - ${convertISODate(receipt.time,'profile')}`}</Typography>
            ))}
        </Box>
    )
}

export default function MessagesPage() {
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [currentUsername, setCurrentUsername] = useState<string | null>(null);
    const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [selectedReadBy, setSelectedReadBy] = useState<ReadBy[]>([]);
    const location = useLocation();
    const { chatId, isGroupChat } = location.state as { chatId: number, isGroupChat: boolean };
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, readBy: ReadBy[], currentUserId: number, userId: number) => {
        if (userId !== currentUserId) return
        setAnchorEl(event.currentTarget);
        setSelectedReadBy(readBy);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
            if (chatId) {
                try {
                    const result = await getMessages(chatId);
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
    }, [chatId]);

    function messageFooter(isGroupChat: boolean, userId: number, currentUserId: number | null, username: string, time: string): string {
        let footer = "";
        let formattedTime = convertISODate(time, 'time');
        if (isGroupChat) {
            if (userId !== currentUserId) footer += username + " ";
            footer += formattedTime;
        } else {
            footer += formattedTime;
        }
        return footer;
    }

    return (
        <>
        {currentUserId && (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                margin: 0,
                padding: 0,
            }}
        >
            <div>
                <ChatHeader chatId={chatId} />
            </div>

            <div
                style={{
                    flexGrow: 1,
                    overflow: "auto",
                }}
            >
                <MessageList
                    style={{
                        backgroundColor: "transparent",
                    }}
                >
                    {messages.map((message, index) => {
                        const currentDate = convertISODate(message.createdAt, 'chat');
                        const previousDate =
                            index > 0 ? convertISODate(messages[index - 1].createdAt, 'chat') : null;

                        // Show separator only if the date is different from the previous message
                        const showSeparator = currentDate !== previousDate;

                        return (
                            <React.Fragment key={message.id}>
                                {showSeparator && (
                                    <MessageSeparator
                                        content={currentDate}
                                        style={{ background: 'transparent' }}
                                    />
                                )}
                                <MessageGroup direction={message.direction} sender={message.username} sentTime={message.createdAt}>
                                    <MessageGroup.Messages>
                                        <Message
                                            model={{
                                                message: message.message,
                                                sentTime: message.createdAt,
                                                sender: message.username,
                                                direction: message.direction,
                                                position: message.position,
                                            }}
                                            onClick={(e) =>
                                                handleClick(e as React.MouseEvent<HTMLButtonElement>, message.readBy, currentUserId, message.userId)
                                            }
                                        >
                                            {message.isImage && (
                                                <Message.ImageContent
                                                    src={`${API_URL}${message.message}`}
                                                    alt="Image"
                                                    width={200}
                                                />
                                            )}
                                            {message.userId !== currentUserId && (
                                                <Avatar
                                                    name={message.username}
                                                    src={
                                                        message.avatar
                                                            ? `${API_URL}${message.avatar}`
                                                            : `https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg`
                                                    }
                                                />
                                            )}
                                        </Message>
                                    </MessageGroup.Messages>
                                    <MessageGroup.Footer>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ justifyContent: "center", alignItems: "center" }}
                                        >
                                            <Typography sx={{ color: "white", fontSize: 12, opacity: 0.5 }}>
                                                {messageFooter(
                                                    isGroupChat,
                                                    message.userId,
                                                    currentUserId,
                                                    message.username,
                                                    message.createdAt
                                                )}
                                            </Typography>
                                            <TickIcon
                                                sx={{
                                                    color: message.readBy.length > 1 ? "#6495ed" : "gray",
                                                    opacity: message.readBy.length > 1 ? "1" : "0.5",
                                                    fontSize: 15,
                                                }}
                                            />
                                        </Stack>
                                    </MessageGroup.Footer>
                                </MessageGroup>
                            </React.Fragment>
                        );
                    })}
                </MessageList>
            </div>

            <div
                style={{
                    minHeight: "50px",
                    flexShrink: 0,
                }}
            >
                <MessagesInput
                    currentUserId={currentUserId}
                    currentUsername={currentUsername}
                    currentUserAvatar={currentUserAvatar}
                    chatId={chatId}
                    setMessages={setMessages}
                />
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <PopupReceipt receipts={selectedReadBy} />
            </Popover>
        </div>
        )}
    </>
    );
}
