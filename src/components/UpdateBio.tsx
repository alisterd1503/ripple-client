import { Box, Paper, Stack, TextField, Typography, Alert } from "@mui/material";
import CenteredButton from './CenteredButton';
import React, { useState } from "react";
import { updateBio } from "../api/updateBio";

export default function UpdateBio({ bio, onClick }: { bio: string | undefined, onClick: (e: any) => any }) {
    const [count, setCount] = useState(0);
    const [newBio, setNewBio] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleUpdateBio = async () => {
        const result = await updateBio(newBio)
    
        if (result.success) {
            window.location.reload();
        } else {
            setMessage(result.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCount(value.length);
        setNewBio(value);
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
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder={bio}
                        sx={{ width: '100%' }}
                        value={newBio}
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
                    onClick={handleUpdateBio}
                    text="Update Bio"
                />
            </Stack>
        </Paper>
    );
}
