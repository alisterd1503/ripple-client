import { Box, Paper, Stack, Alert } from "@mui/material";
import React, { useState } from "react";
import { changePassword } from "../../api/SettingsAPI/changePassword";
import CenteredButton from "../Reusable/CenteredButton";
import PasswordInput from "../Reusable/PasswordInput";
import { NewPasswordModel } from "../../models/NewPasswordModel";

export default function ChangePassword({ onClick }: { onClick: (e: any) => any }) {

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [message, setMessage] = useState<string | null>(null);

    const handleUpdatePassword = async () => {
        const passwords: NewPasswordModel = {
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
                    
                    <PasswordInput onChange={handleChange(setCurrentPassword)} password={currentPassword} label='Current Password' marginBottom={5}/>
                    <PasswordInput onChange={handleChange(setNewPassword)} password={newPassword} label='New Password' marginBottom={2}/>
                    <PasswordInput onChange={handleChange(setConfirmPassword)} password={confirmPassword} label='Confirm Password'/>

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
