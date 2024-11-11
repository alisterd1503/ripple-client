import { Box, Paper, Stack, TextField, Alert } from "@mui/material";
import CenteredButton from './CenteredButton';
import React, { useState } from "react";
import { changePassword } from "../api/changePassword";

interface NewPassword {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

export default function ChangePassword({ onClick }: { onClick: (e: any) => any }) {

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [message, setMessage] = useState<string | null>(null);

    const handleUpdatePassword = async () => {
        const passwords: NewPassword = {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
        const result = await changePassword(passwords)
    
        if (result.success) {
            window.location.reload();
        } else {
            setMessage(result.message);
        }
    };

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);

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
                        required
                        label="Current Password"
                        value={currentPassword}
                        onChange={handleChange(setCurrentPassword)}
                        sx={{ width: '100%', marginBottom: 5 }}
                    />
                    <TextField
                        required
                        label="New Password"
                        value={newPassword}
                        onChange={handleChange(setNewPassword)}
                        sx={{ width: '100%', marginBottom: 2 }}
                    />
                    <TextField
                        required
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={handleChange(setConfirmPassword)}
                        sx={{ width: '100%' }}
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
                        <div style={{height: '30px'}}>
                          {message && <Alert severity="info" sx={{ backgroundColor: 'transparent', padding: 0}}>{message}</Alert>}
                        </div>
                    </Stack>
                </Box>
                <CenteredButton 
                    onClick={handleUpdatePassword}
                    text="Update Password"
                />
            </Stack>
        </Paper>
    );
}
