import { Box, Paper, Stack, TextField, Typography, Alert, Avatar, Badge } from "@mui/material";
import React, { useState } from "react";
import CenteredButton from "../Reusable/CenteredButton";
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';

export default function MakeNewGroup() {

    const description = 'set new description'

    const [avatar, setAvatar] = useState<string | null>(null); 
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');

    const [count, setCount] = useState(0);

    const [message, setMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCount(value.length);
        setNewDescription(value);
    };

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

    // Function to save the avatar (calls the upload API)
    const handleSaveAvatar = async () => {
        if (avatarFile) {
            try {
                console.log(avatarFile); 
            } catch (error) {
                console.error("Error saving avatar:", error);
            }
            window.location.reload();
        }
    }

    return (
        <Paper elevation={1} sx={{ width: '80%', borderRadius: '7px' }} onClick={(e) => e.stopPropagation()}>
            <Stack
                direction="column"
                spacing={0}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box sx={{width: "100%", display: 'flex', justifyContent:'center', alignItems: 'center', padding: '20px'}}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <EditIcon fontSize="large"/>
                        }
                        >
                        <Avatar
                            sx={{ width: 100, height: 100, color: 'white' }}
                            alt={'Default'}
                        >
                            <GroupIcon fontSize="large"/>
                        </Avatar>
                    </Badge> 
                </Box>

                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 10px 20px', flexDirection: 'column' }}>
                    <TextField
                        id="outlined-basic"
                        placeholder={"Group name (optional)"}
                        sx={{ width: '100%' }}
                        value={newTitle}
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 10px 20px', flexDirection: 'column' }}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder={"Group description (optional)"}
                        sx={{ width: '100%' }}
                        value={newDescription}
                        onChange={handleChange}
                    />
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: '100%',
                        }}
                    >
                        <div>{message && <Alert severity="info" sx={{ padding: 0, backgroundColor: 'transparent'}}>{message}</Alert>}</div>
                        <Typography sx={{ opacity: 0.5 }}>{count}/100</Typography>
                    </Stack>
                </Box>
                <CenteredButton 
                    onClick={()=>console.log(newTitle, newDescription, avatarFile)}
                    text="Create Group"
                />
            </Stack>
        </Paper>
    );
}
