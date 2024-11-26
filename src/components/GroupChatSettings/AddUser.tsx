import { Box, Paper, Stack, Alert } from "@mui/material";
import React, { useState } from "react";
import CenteredButton from "../Reusable/CenteredButton";
import FindUsers from "../ContactPage/FindUsers";
import { addUser } from "../../api/addUser";
import { UserModel } from "../../models/UserModel";

export default function AddUser({ onClick, chatId }: { chatId: number, onClick: (e: any) => any }) {
    const [message, setMessage] = useState<string | null>(null);
    const [users, setUsers] = React.useState<UserModel[]>([]);

    const handleAddUser = async () => {
        const result = await addUser(chatId, users)
    
        if (result.success) {
            window.location.reload();
        } else {
            setMessage(result.message);
        }
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
                        <FindUsers updateUsers={setUsers}/>
                        <div>{message && <Alert severity="info" sx={{ padding: 0, backgroundColor: 'transparent'}}>{message}</Alert>}</div>
                </Box>
                <CenteredButton 
                    onClick={handleAddUser}
                    text={users.length > 1 ? "Add Users" : "Add User"}
                />
            </Stack>
        </Paper>
    );
}
