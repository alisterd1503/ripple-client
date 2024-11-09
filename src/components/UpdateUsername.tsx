import { Box, Paper, Stack, TextField, Typography, Alert } from "@mui/material";
import CenteredButton from './CenteredButton';
import React, { useState } from "react";
import { updateUsername } from "../api/udpateUsername";

export default function UpdateUsername({ username, onClick }: { username: string | undefined, onClick: (e: any) => any }) {
    const [newUsername, setNewUsername] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleUpdateUsername = async () => {
        const result = await updateUsername(newUsername)
    
        if (result.success) {
            localStorage.setItem('username', newUsername);
            window.location.reload();
        } else {
            setMessage(result.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewUsername(value);
    };

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
                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 10px 20px', flexDirection: 'column' }}>
                    <TextField
                        id="outlined-basic"
                        placeholder={username}
                        sx={{ width: '100%' }}
                        value={newUsername}
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
                        <div style={{height: '30px'}}>{message && <Alert severity="info" sx={{ backgroundColor: 'transparent', padding: 0}}>{message}</Alert>}</div>
                    </Stack>
                </Box>
                <CenteredButton 
                    onClick={handleUpdateUsername}
                    text="Update Username"
                />
            </Stack>
        </Paper>
    );
}
