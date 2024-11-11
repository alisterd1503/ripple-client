import { Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from "react-router-dom";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileButton from "../components/ProfileButton";

interface ProfileStatePage {
    username: string,
    userId: number,
    bio: string,
    added_at: string,
    avatar: string
}

function convertISODate(isoDate: string): string {
    const date = new Date(isoDate);
    const now = new Date();
  
    const formattedDate = date.toLocaleDateString('en-GB');
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });
  
    // Check if the date is today
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return formattedTime;
    }
  
    // Check if the date is within the current week
    const dayDifference = (now.getDay() + 7 - date.getDay()) % 7;
    const isThisWeek = dayDifference < now.getDay() && dayDifference >= 0;
  
    if (isThisWeek) {
      return dayOfWeek;
    }
  
    // For any other dates, return the formatted date (dd/mm/yyyy)
    return formattedDate;
}

export default function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, avatar, bio, added_at, userId } = location.state as ProfileStatePage || {};
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

            <ProfileAvatar username={username} height='100px' width='100px' avatarPath={avatar}/>
            <Typography variant="h3" fontWeight={"bold"} fontSize={30} gutterBottom>
                    {username}
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
                    <Typography sx={{padding: '10px', opacity: 0.7}}>{bio}</Typography>
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
                    <Typography sx={{padding: '10px', opacity: 0.7}}>Friends since: {convertISODate(added_at)}</Typography>
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
                    <ProfileButton text="Remove Friend" red/>
                </Stack>
            </Paper>
                
        </Stack>
    )
}