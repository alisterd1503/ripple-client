import { Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { removeFriend } from "../../api/ProfileAPI/removeFriend";
import ProfileAvatar from "../Reusable/ProfileAvatar";
import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../api/ProfileAPI/getUserProfile";
import { convertISODate } from "../../utils/convertISODate";
import ListGroupChats from "./ListGroupChats";
import { startChat } from "../../api/startChat";
import { favouriteChat } from "../../api/ProfileAPI/favouriteChat";

interface UserProfile {
    userId: number;
    username: string;
    avatar: string;
    bio: string;
    added_at: string | null;
    is_favourite: boolean;
    groups_in: {
        chatId: number;
        title: string;
        groupAvatar: string;
        members: string[]
    }[];
}
  
export default function UserProfilePage({userId}:{userId: number}) {
    const navigate = useNavigate();

    const [profile , setProfile] = useState<UserProfile>()

    useEffect(() => {
        const fetchProfile = async () => {
          const result = await getUserProfile(userId);
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

                {profile.added_at ? 
                    (<>
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

                        { profile.groups_in.length > 0 && <ListGroupChats groupChats={profile.groups_in}/>}

                        <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                            <Stack
                                direction="column"
                                spacing={0}
                                sx={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                }}
                            >
                                {profile.is_favourite ? 
                                (<ProfileButton  text="Remove from Favourites" Red
                                    onClick={() => {favouriteChat({ isFavourite: false, userId: profile.userId });window.location.reload();} } 
                                />) 
                                : 
                                (<ProfileButton text="Add to Favourites" 
                                    onClick={() => {favouriteChat({ isFavourite: true, userId: profile.userId });window.location.reload();} } 
                                />)
                            }
                                <ProfileButton onClick={handleRemoveFriend} text="Remove Friend" Red NotLast/>
                            </Stack>
                        </Paper>
                    </>) 
                    : 
                    (<Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                        <Stack
                            direction="column"
                            spacing={0}
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <ProfileButton text="Add User" onClick={() => { startChat(profile.userId); navigate('/contacts');}}  NotLast/>
                        </Stack>
                    </Paper>
                    )
                }
                    
            </Stack>
        }
        </>
    )
}