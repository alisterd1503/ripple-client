import { Box, Paper, Stack, TextField, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import CenteredButton from "../Reusable/CenteredButton";
import { updateDescription } from "../../api/updateDescription";

export default function UpdateDescription({ description, onClick, chatId }: { chatId: number, description: string | undefined, onClick: (e: any) => any }) {
    const [count, setCount] = useState(0);
    const [newDescription, setNewDescription] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleUpdateDescription = async () => {
        const result = await updateDescription(chatId, newDescription)
    
        if (result.success) {
            window.location.reload();
        } else {
            setMessage(result.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCount(value.length);
        setNewDescription(value);
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
                        placeholder={description}
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
                    onClick={handleUpdateDescription}
                    text="Update Description"
                />
            </Stack>
        </Paper>
    );
}
