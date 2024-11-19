import { Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { removeFriend } from "../../api/ProfileAPI/removeFriend";
import ProfileAvatar from "../Reusable/ProfileAvatar";
import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/ProfileAPI/getUserProfile";
import { convertISODate } from "../../utils/convertISODate";


interface UserProfile {
    userId: number;
    username: string;
    avatar: string;
    bio: string;
    added_at: string | null;
    groups_in: {
        chatId: number;
        title: string;
        groupAvatar: string;
    }[];
}
  
export default function UserProfilePage({userId}:{userId: number}) {
    const navigate = useNavigate();

    const [profile , setProfile] = useState<UserProfile>()

    useEffect(() => {
        const fetchProfile = async () => {
          const result = await getUserProfile(userId);
          console.log(result)
          setProfile(result)
        };
    
        fetchProfile()
    }, [userId]);

    const handleRemoveFriend = async () => {
        try {
            await removeFriend(userId);
            navigate('/contacts')
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    
    return (
        <>
        {profile && 
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: '10px'
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: '100%'
                    }}
                >
                    <button
                            style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={() => navigate("/contacts")}
                        >
                            <ArrowBackIosNewIcon fontSize="medium" sx={{ color: 'white' }} />
                        </button>
                        <Typography variant="h6" fontWeight={"bold"} fontSize={20} gutterBottom>Contact Info</Typography>
                        <Typography variant="h6" fontSize={18} gutterBottom>Edit</Typography>
                </Stack>

                <ProfileAvatar username={profile.username} height='100px' width='100px' avatarPath={profile.avatar}/>
                <Typography variant="h3" fontWeight={"bold"} fontSize={30} gutterBottom>
                        {profile.username}
                </Typography>

                <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                    <Stack
                        direction="column"
                        spacing={0}
                        sx={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                        }}
                    >
                        <Typography sx={{padding: '10px', opacity: 0.7}}>{profile.bio}</Typography>
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
                        <Typography sx={{padding: '10px', opacity: 0.7}}>{profile.added_at ? convertISODate(profile.added_at,'profile') : ''}</Typography>
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
                        <ProfileButton text="Add to Favourites"/>
                        <ProfileButton onClick={handleRemoveFriend} text="Remove Friend" red/>
                    </Stack>
                </Paper>
                    
            </Stack>
        }
        </>
    )
}