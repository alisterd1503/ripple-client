import { Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileButton from "../components/ProfileButton";
import { removeFriend } from "../api/removeFriend";

interface UserProfileModel {
    userId: number;
    username: string;
    avatar: string;
    bio: string;
}
  

export default function UserProfilePage({body, chatId}:{body: UserProfileModel, chatId: number}) {
    const navigate = useNavigate();

    const handleRemoveFriend = async () => {
        try {
            await removeFriend(chatId);
            navigate('/contacts')
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    return (
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

            <ProfileAvatar username={body.username} height='100px' width='100px' avatarPath={body.avatar}/>
            <Typography variant="h3" fontWeight={"bold"} fontSize={30} gutterBottom>
                    {body.username}
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
                    <Typography sx={{padding: '10px', opacity: 0.7}}>{body.bio}</Typography>
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
                    <Typography sx={{padding: '10px', opacity: 0.7}}>ADD DATE SOMEHOW</Typography>
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
    )
}