import React, { useState } from 'react';
import { Avatar, Box, Paper, Stack, } from "@mui/material";
import CenteredButton from './CenteredButton';
import { uploadPhoto } from '../api/saveAvatar';

export default function AvatarUpload() {
    const [avatar, setAvatar] = useState<string | null>(null); 
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    // Handler for file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file); // Save the original file for uploading
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // Optional: Create a base64 preview
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
        setAvatar(null);
        setPreview(null);
        setAvatarFile(null);
    };

    // Function to save the avatar (calls the upload API)
    const handleSaveAvatar = async () => {
        if (avatarFile) {
            try {
                const response = await uploadPhoto(avatarFile); 
                console.log("Upload successful:", response);
            } catch (error) {
                console.error("Error saving avatar:", error);
            }
        }
    }

  return (
    <Paper elevation={1} sx={{ width: '80%', borderRadius: '7px', }}>
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
                src={preview || avatar || "/default-avatar.png"}
                sx={{ width: 100, height: 100 }}
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
