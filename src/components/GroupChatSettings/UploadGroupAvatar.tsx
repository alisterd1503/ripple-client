import React, { useState } from 'react';
import { Avatar, Box, Paper, Stack, } from "@mui/material";
import CenteredButton from '../Reusable/CenteredButton';
import { deleteGroupPhoto } from '../../api/deleteGroupPhoto';
import { uploadGroupPhoto } from '../../api/saveGroupAvatar';
const API_URL = `${process.env.REACT_APP_API_URL}`;

export default function AvatarUpload({currentAvatar, onClick, title, chatId}: {chatId: number, currentAvatar: string | undefined, title: string | undefined, onClick: (e: any) => any}) {
    const [avatar, setAvatar] = useState<string | null>(null); 
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
 
    // Handler for file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setAvatar(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to reset the avatar to default
    const handleRemoveAvatar = () => {
        deleteGroupPhoto(chatId)
        window.location.reload();
    };

    // Function to save the avatar (calls the upload API)
    const handleSaveAvatar = async () => {
        if (avatarFile) {
            try {
                await uploadGroupPhoto(chatId, avatarFile); 
            } catch (error) {
                console.error("Error saving avatar:", error);
            }
            window.location.reload();
        }
    }

  return (
    <Paper elevation={1} sx={{ width: '80%', borderRadius: '7px', }} onClick={(e) => e.stopPropagation()}>
        <Stack
            direction="column"
            spacing={0}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
        <Box sx={{width: "100%", display: 'flex', justifyContent:'center', alignItems: 'center', padding: '20px'}}>
            <Avatar
                src={preview || avatar || `${API_URL}${currentAvatar}`}
                sx={{ width: 100, height: 100, color: '#ece5dd' }}
                alt={title}
            />
            
        </Box>
        <CenteredButton
            text="Upload Photo"
            fileInput={true}
            onFileChange={handleFileChange}
        />
            <CenteredButton 
                onClick={handleSaveAvatar}
                text="Save Photo"
            />
            <CenteredButton 
                onClick={handleRemoveAvatar}
                text="Remove Photo"
                red
            />
        </Stack>
    </Paper>
  );
}
