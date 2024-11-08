import { Backdrop, Button, Paper, Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PenIcon from '@mui/icons-material/EditOutlined';
import PasswordIcon from '@mui/icons-material/PasswordOutlined';
import PhotoIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import TextIcon from '@mui/icons-material/ShortTextOutlined';
import SettingsButton from "../components/SettingsButton";
import SearchSettings from "../components/SearchSettings";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { UserModel } from "../models/UserModel";
import { ProfileModel } from "../models/ProfileModel";
import { getProfile } from "../api/getProfile";
import React from "react";
import UploadAvatar from "../components/UploadAvatar";
import ProfileAvatar from "../components/ProfileAvatar";
import DarkModeToggel from "../components/DarkModeToggel";

interface SettingsPageProps {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
}

export default function SettingsPage({toggleTheme, mode}: SettingsPageProps) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
    const [profile, setProfile] = useState<ProfileModel | null>(null);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode<{ username: string, userId: number }>(token);
            const body: UserModel = {
                username: decodedToken.username,
                userId: decodedToken.userId
            }
            setCurrentUser(body);
        }
        const fetchProfile = async () => {
            const result = await getProfile();
            setProfile(result);
        };
        fetchProfile();
    }, []);
    
    const logout = () => {
        localStorage.removeItem("currentUser");
        navigate("/");
    };

    const handleButtonClick = (action: string) => {
        if (action === 'avatar') handleOpen();
    };

    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                padding: '10px'
            }}
        >
            <Typography variant="h3" fontWeight={"bold"} fontSize={35} gutterBottom>
                Settings
            </Typography>
            <SearchSettings/>

            <Paper elevation={1} sx={{ width: '100%', padding: '15px', borderRadius: '7px', }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <ProfileAvatar avatarPath={profile?.avatar} username={currentUser?.username} height="80px" width="80px"/>
                    <Stack
                        direction="column"
                        spacing={-1}
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography variant="h5">{currentUser?.username}</Typography>
                        <Typography fontSize="17px" sx={{ opacity: '0.7' }}>{profile?.bio}</Typography>
                    </Stack>
                </Stack>
            </Paper>

            <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <SettingsButton 
                        onClick={() => handleButtonClick("Edit username")}
                        icon={<PenIcon/>}
                        text="Edit Username"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("Edit bio")}
                        icon={<TextIcon />}
                        text="Edit bio"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("Edit password")}
                        icon={<PasswordIcon />}
                        text="Change password"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("avatar")}
                        icon={<PhotoIcon />}
                        text="Change profile picture"
                    />
                    <DarkModeToggel toggleTheme={toggleTheme} mode={mode} />
                </Stack>
            </Paper>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                <UploadAvatar/>
            </Backdrop>

            <Button variant="outlined" color="error" sx={{ width: "100%" }} onClick={logout}>
                Log Out
            </Button>

            <Footer />
        </Stack>
    );
}
