import { Box, Paper, Stack, TextField, Typography, Alert, Button } from "@mui/material";
import CenteredButton from './CenteredButton';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../api/deleteAccount";
import PasswordInput from "./PasswordInput";

export default function DeleteAccount({ onClick }: { onClick: (e: any) => any }) {
    const [message, setMessage] = useState<string | null>(null);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [confirm, setConfirm] = useState(false);

    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const result = await deleteAccount(currentPassword);
    
        if (result.success) {
            navigate('/');
        } else {
            setMessage(result.message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCurrentPassword(value);
    };

    const handleConfirmClick = () => {
        setConfirm(true);
    };

    const handleCancelClick = () => {
        setConfirm(false);
        setCurrentPassword('');
        setMessage(null);
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
                {confirm ? 
                (
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 10px 20px', flexDirection: 'column' }}>
                        <PasswordInput onChange={(e) => setCurrentPassword(e.target.value)} password={currentPassword} label='Current Password'/>
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
                                {message && <Alert severity="info" sx={{ backgroundColor: 'transparent', padding: 0 }}>{message}</Alert>}
                            </div>
                        </Stack>
                    </Box>
                )
                    :
                (
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 20px 10px 20px', flexDirection: 'column' }}>
                        <Alert sx={{backgroundColor: 'transparent', padding: '0px 0px 5px 0px'}} severity="error">Confirm Account Deletion</Alert>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: '100%',
                                padding: 0
                            }}
                        >
                            <Button variant="outlined" color="error" onClick={handleConfirmClick}>
                                Confirm
                            </Button>
                            <Button variant="outlined" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                )}

                <CenteredButton
                    disable={!confirm || !currentPassword}
                    onClick={handleDeleteAccount}
                    text="Delete Account"
                />
            </Stack>
        </Paper>
    );
}
