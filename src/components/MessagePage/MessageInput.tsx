import { Stack, TextField, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { MessageModel } from "../../models/MessageModel";
import { postMessage } from "../../api/MessagesAPI/postMessage";

interface MessagesInputProps {
    currentUsername: string | null,
    currentUserId: number | null,
    currentUserAvatar: string | null,
    chatId: number,
    setMessages: React.Dispatch<React.SetStateAction<MessageModel[]>>
}

export default function MessagesInput({ currentUsername, currentUserId, currentUserAvatar, chatId, setMessages }: MessagesInputProps) {
    const [input, setInput] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleSend = async () => {
        if (!currentUserId || !currentUsername) return;

        try {
            const newMessageData = await postMessage(chatId, input, selectedImage);

            if (!newMessageData) return;

            const newMessage: MessageModel = {
                id: 0,
                userId: currentUserId,
                username: currentUsername,
                avatar: currentUserAvatar,
                message: selectedImage ? newMessageData.imageUrl : input,
                createdAt: new Date().toISOString(),
                direction: "outgoing",
                position: "last",
                isImage: !!selectedImage,
                readBy: []
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput('');
            setSelectedImage(null);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#054640',
                padding: '10px',
            }}
        >
            <Button
                component="label"
                sx={{
                    width: '40px',
                    height: '40px',
                    minWidth: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '50%',
                }}
            >
                <AddIcon fontSize="medium" sx={{ color: 'white' }} />
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>

            <TextField
                sx={{
                    width: "100%",
                    '& .MuiInputBase-root': {
                        padding: 0,
                        borderRadius: '20px',
                        backgroundColor: '#06625f',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '20px',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '8px 16px',
                        color: 'white',
                    },
                }}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={input}
                onChange={handleChange}
                disabled={!!selectedImage} // Disable input if image is selected
            />

            {selectedImage && (
                <Box
                    component="img"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    sx={{
                        maxWidth: 40,
                        maxHeight: 40,
                        marginLeft: 1,
                        borderRadius: '8px',
                    }}
                />
            )}

            <Button
                sx={{
                    width: '40px',
                    height: '40px',
                    minWidth: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#25d366',
                    borderRadius: '50%',
                }}
                onClick={handleSend}
            >
                <SendIcon fontSize="medium" sx={{ color: 'black' }} />
            </Button>
        </Stack>
    );
}
