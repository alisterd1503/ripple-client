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
import DarkModeToggel from "../components/DarkModeToggel";
import UpdateBio from "../components/UpdateBio";
import ProfileCard from "../components/ProfileCard";

interface SettingsPageProps {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
}

export default function SettingsPage({toggleTheme, mode}: SettingsPageProps) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
    const [profile, setProfile] = useState<ProfileModel | null>(null);
    const [openBackdrop, setOpenBackdrop] = useState<string | null>(null);

    const handleClose = () => {
        setOpenBackdrop(null);
    };

    const handleButtonClick = (action: string) => {
        setOpenBackdrop(action);
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

            <ProfileCard username={currentUser?.username} avatar={profile?.avatar} bio={profile?.bio}/>

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
                        onClick={() => handleButtonClick("username")}
                        icon={<PenIcon/>}
                        text="Edit Username"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("bio")}
                        icon={<TextIcon />}
                        text="Edit bio"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("password")}
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
                open={openBackdrop === "avatar"}
                onClick={handleClose}
            >
                <UploadAvatar currentAvatar={profile?.avatar} onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "bio"}
                onClick={handleClose}
            >
                <UpdateBio bio={profile?.bio} onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            <Button variant="outlined" color="error" sx={{ width: "100%" }} onClick={logout}>
                Log Out
            </Button>

            <Footer />
        </Stack>
    );
}
