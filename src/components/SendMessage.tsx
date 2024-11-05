import { Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
    chat_id: number;
    user_id: number;
    message: string;
}

interface User {
    id: number;
    username: string;
}

export default function MessagesInput({ chatId }: { chatId: number }) {
    const [newMessage, setNewMessage] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
        }
    }, []);

    const postMessage = async () => {
        if (newMessage.trim() === '') return;

        if (currentUser) {
            const data: Post = {
                chat_id: chatId,
                user_id: currentUser.id,
                message: newMessage
            };

            try {
                const response = await axios.post('http://localhost:5002/api/postMessage', data);
                setNewMessage('');
                return response.data;
            } catch (error) {
                console.error('Error posting message:', error);
            }
        }
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
            }}
        >
            <TextField
                fullWidth
                autoComplete="off"
                id="outlined-basic"
                variant="outlined"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        height: 40,
                    },
                }}
            />
            <Button
                onClick={postMessage}
                variant="contained"
                sx={{ height: 40 }} 
            >
                Send
            </Button>
        </Stack>
    );
}
