import { Box, Paper, Stack, TextField, Typography, Alert, Avatar, Badge } from "@mui/material";
import React, { useRef, useState } from "react";
import CenteredButton from "../Reusable/CenteredButton";
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import { UserModel } from "../../models/UserModel";
import ProfileAvatar from "../Reusable/ProfileAvatar";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { startGroupChat } from "../../api/startGroupChat";
import { StartGroupChatModel } from "../../models/StartGroupChatModel";

export default function MakeNewGroup({users, setUsers, setOpenBackdrop}: {users: UserModel[], setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>, setOpenBackdrop: React.Dispatch<React.SetStateAction<boolean>>}) {

    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const [newTitle, setNewTitle] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCount(value.length);
        setNewDescription(value);
    };

    const removeUser = (userToRemove: UserModel) => {
        setUsers((prevUsers) =>
          prevUsers.filter(user => user.userId !== userToRemove.userId)
        );
    };

    // Handler for file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveAvatar = () => {
        setAvatarFile(null)
        setPreview(null)
    }

    const startNewGroupChat = async () => {
        const body: StartGroupChatModel = {
            users: users,
            title: newTitle,
            description: newDescription,
            avatar: avatarFile
        }
        const result =  await startGroupChat(body);
        if (result.success) {
            setOpenBackdrop(false)
            setUsers([])
        } else {
            setMessage(result.message);
        }
    }

    return (
        <Paper elevation={1} sx={{ width: '80%', borderRadius: '7px' }} onClick={(e) => e.stopPropagation()}>
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: '20px'
                }}
            >
                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        sx={{ '&:hover': {
                            cursor: 'pointer',
                            opacity: 0.8,
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        }}}
                        badgeContent={
                            avatarFile ? (
                                <DeleteIcon fontSize="large" />
                            ) : (
                                <EditIcon fontSize="large" />
                            )
                        }
                        onClick={()=> {avatarFile ? handleRemoveAvatar() : handleAvatarClick()}}
                    >
                        <Avatar
                            sx={{ width: 100, height: 100, color: '#ece5dd'}}
                            alt="Default"
                            src={preview || undefined}
                        >
                            {!preview && <GroupIcon fontSize="large"/>}
                        </Avatar>
                    </Badge>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </Box>

                {/* Additional form fields and group members list */}
                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <TextField
                        id="outlined-basic"
                        placeholder="Group name (optional)"
                        sx={{ width: '100%' }}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </Box>

                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Group description (optional)"
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
                        <div></div>
                        <Typography sx={{ opacity: 0.5 }}>{count}/100</Typography>
                    </Stack>
                </Box>

                {/* Displaying group members */}
                <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column'}}>
                    <Typography variant="h6" fontSize={20} fontWeight="bold" gutterBottom>
                        {users.length} members
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {users.map((user) => (
                            <Stack key={user.userId} direction="column" spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    badgeContent={
                                        <CloseIcon fontSize='small' sx={{ borderRadius: '50%', backgroundColor: 'darkgrey', opacity: 0.9 }} onClick={() => removeUser(user)} />
                                    }
                                >
                                    <ProfileAvatar username={user.username} avatarPath={user.avatar} />
                                </Badge>
                                <Typography sx={{ color: '#ece5dd', fontSize: 12, opacity: 0.5 }}>{user.username}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Box>

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
            </Stack>
            <CenteredButton 
                    onClick={startNewGroupChat}
                    text="Create Group"
                />
        </Paper>
    );
}
