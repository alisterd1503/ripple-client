import { Backdrop, Paper, Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import PenIcon from '@mui/icons-material/EditOutlined';
import PasswordIcon from '@mui/icons-material/PasswordOutlined';
import PhotoIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import TextIcon from '@mui/icons-material/ShortTextOutlined';
import { useState, useEffect } from "react";
import { ProfileModel } from "../models/ProfileModel";
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { getProfile } from "../api/SettingsAPI/getProfile";
import ProfileCard from "../components/ProfilePage/ProfileCard";
import SearchSettings from "../components/SettingPage/SearchSettings";
import SettingsButton from "../components/SettingPage/SettingsButton";
import ChangePassword from "../components/Settings/ChangePassword";
import DarkModeToggel from "../components/Settings/DarkModeToggel";
import DeleteAccount from "../components/Settings/DeleteAccount";
import UpdateBio from "../components/Settings/UpdateBio";
import UpdateUsername from "../components/Settings/UpdateUsername";
import UploadAvatar from "../components/Settings/UploadAvatar";
import { convertISODate } from "../utils/convertISODate";
import { logoutUser } from "../api/AuthenticationAPI/logoutUser";

interface SettingsPageProps {
    toggleTheme: () => void;
    mode: 'light' | 'dark';
}

export default function SettingsPage({toggleTheme, mode}: SettingsPageProps) {
    const [profile, setProfile] = useState<ProfileModel | null>(null);
    const [openBackdrop, setOpenBackdrop] = useState<string | null>(null);

    const handleClose = () => {
        setOpenBackdrop(null);
    };

    const handleButtonClick = (action: string) => {
        setOpenBackdrop(action);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await getProfile();
            setProfile(result);
        };
        fetchProfile();
    }, []);

    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                padding: '10px',
                paddingTop: '30px'
            }}
        >
            <Typography variant="h3" fontWeight={"bold"} fontSize={35} gutterBottom>
                Settings
            </Typography>
            <SearchSettings/>

            <ProfileCard username={profile?.username} avatar={profile?.avatar} bio={profile?.bio} isOnline={profile?.is_online}/>

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
                        onClick={() => handleButtonClick("avatar")}
                        icon={<PhotoIcon />}
                        text="Change profile picture"
                    />
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
                        onClick={() => handleButtonClick("password")}
                        icon={<PasswordIcon />}
                        text="Change password"
                        single
                    />
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
                    <DarkModeToggel toggleTheme={toggleTheme} mode={mode} />
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
                        onClick={logoutUser}
                        icon={<LogoutIcon />}
                        text="Logout"
                        red
                        single
                    />
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
                        onClick={() => handleButtonClick("delete")}
                        icon={<DeleteIcon />}
                        text="Delete account"
                        red
                        single
                    />
                </Stack>
            </Paper>
            
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "avatar"}
                onClick={handleClose}
            >
                <UploadAvatar currentAvatar={profile?.avatar} username={profile?.username} onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "bio"}
                onClick={handleClose}
            >
                <UpdateBio bio={profile?.bio} onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "username"}
                onClick={handleClose}
            >
                <UpdateUsername username={profile?.username} onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "password"}
                onClick={handleClose}
            >
                <ChangePassword onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "delete"}
                onClick={handleClose}
            >
                <DeleteAccount onClick={(e) => e.stopPropagation()} />
            </Backdrop>

            {profile?.created_at && <Typography sx={{opacity: 0.4}}>Account {convertISODate(profile.created_at,'profile')}</Typography>}

            <Footer />
        </Stack>
    );
}
