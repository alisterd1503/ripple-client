import { Paper, Stack, Button, Typography } from "@mui/material";
import ArrowIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
// import { useNavigate } from "react-router-dom";
// import { ChatModel } from "../../models/ChatModel";
import ProfileAvatar from "../Reusable/ProfileAvatar";

interface Members {
    userId: number;
    username: string;
    avatar: string;
    bio: string;
}

export default function ListMembers({members, count}:{members:Members[], count: number}) {
    // const navigate = useNavigate(); 

    // const openProfile = (body: ChatModel) => {
    //     navigate('/profile', { state: { body } });
    // };

    return (
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
            <Typography variant="h6" fontSize={20} fontWeight={"bold"} gutterBottom>
                {count} members
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
                    {members.map((user) => (
                    <Button
                        sx={{
                            color: 'primary', 
                            borderBottom: 'solid rgba(128, 128, 128, 0.2) 0.5px', 
                            width: '100%',
                            textTransform: 'none',
                            fontSize: '20px',
                            display: 'flex',
                            padding: '5px 10px 5px 10px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }} 
                        onClick={()=>console.log(user.userId)}
                    >
                        <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <ProfileAvatar avatarPath={user.avatar} username={user.username} height={'40px'} width={'40px'}/>
                            <Stack direction="column" spacing={-0.5} sx={{ justifyContent: "center", alignItems: "flex-start",}}>
                                <Typography fontSize={17}>{user.username}</Typography>
                                <Typography fontSize={15} sx={{opacity: 0.5}}>{user.bio}</Typography>
                            </Stack>
                        </Stack>
                        <ArrowIcon sx={{opacity: 0.3}}/>
                    </Button>
                    ))}
                </Stack>
            </Paper>
        </div>
    )
}