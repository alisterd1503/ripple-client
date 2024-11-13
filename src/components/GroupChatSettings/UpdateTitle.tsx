import { Box, Paper, Stack, TextField, Alert } from "@mui/material";
import React, { useState } from "react";
import CenteredButton from "../Reusable/CenteredButton";
import { updateTitle } from "../../api/updateTitle";

export default function UpdateUsername({ chatId, title, onClick }: { chatId: number, title: string | undefined, onClick: (e: any) => any }) {
    const [newTitle, setNewTitle] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleUpdateTitle = async () => {
        const result = await updateTitle(chatId, newTitle)
    
        if (result.success) {
            window.location.reload();
        } else {
            setMessage(result.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewTitle(value);
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
                        placeholder={title}
                        sx={{ width: '100%' }}
                        value={newTitle}
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
                    onClick={handleUpdateTitle}
                    text="Update Title"
                />
            </Stack>
        </Paper>
    );
}
