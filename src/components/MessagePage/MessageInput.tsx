import { Stack, TextField, Button, Box, Badge } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { MessageModel } from "../../models/MessageModel";
import { postMessage } from "../../api/MessagesAPI/postMessage";
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';

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
                    width: '30px',
                    height: '30px',
                    minWidth: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#032a28',
                    borderRadius: '10px',
                    transition: 'transform 0.2s',
                    marginLeft: '3px'
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
                        borderRadius: '12px',
                        backgroundColor: '#06625f',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '12px',
                        borderColor: 'transparent',
                    },
                    '& .MuiOutlinedInput-input': {
                        padding: '6px 12px',
                        color: 'white',
                        fontSize: '16px',
                    },
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSend();
                    }
                }}
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={input}
                onChange={handleChange}
                disabled={!!selectedImage}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ display: 'flex', alignItems: 'center', p: 0, height: "100%" }}>
                            <Button
                                onClick={handleSend}
                                sx={{
                                    width: '30px',
                                    height: '30px',
                                    minWidth: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#25d366',
                                    borderRadius: '10px',
                                    transition: 'transform 0.2s',
                                    marginRight: '3px'
                                }}
                            >
                                <SendIcon fontSize="small" sx={{ color: 'white' }} />
                            </Button>
                        </InputAdornment>
                    )
                }}
            />
    
            {selectedImage && (
                <Badge
                    badgeContent={
                        <CloseIcon
                            fontSize="small"
                            sx={{
                                cursor: 'pointer',
                                color: 'black',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                p: 0.5,
                                opacity: 0.5
                            }}
                            onClick={() => setSelectedImage(null)}
                        />
                    }
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
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
                </Badge>
            )}
        </Stack>
    );
    
}
