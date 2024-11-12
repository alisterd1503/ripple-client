import { Paper, Stack, Button, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ProfileAvatar from "./ProfileAvatar";
import ArrowIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

interface Participants {
    userId: number;
    username: string;
    avatar: string;
    bio: string;
}

export default function ListParticipants(participants:Participants[]) {
    return (
        <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    {participants.map((user) => (
                    <Button
                        sx={{
                            color: red ? '#DD5F70' : 'primary', 
                            borderBottom: 'solid rgba(128, 128, 128, 0.2) 0.5px', 
                            width: '100%',
                            textTransform: 'none',
                            fontSize: '20px',
                            display: 'flex',
                            padding: '10px 20px 10px 20px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }} 
                        onClick={()=>console.log(user.userId)}
                    >
                        <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <ProfileAvatar avatarPath={user.avatar} username={user.username}/>
                            <Typography>{user.username}</Typography>
                        </Stack>
                        <ArrowIcon sx={{opacity: 0.3}}/>
                    </Button>
                    ))}
    


                </Stack>
            </Paper>
    )
}