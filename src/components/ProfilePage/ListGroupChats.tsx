import { Paper, Stack, Button, Typography } from "@mui/material";
import ArrowIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import ProfileAvatar from "../Reusable/ProfileAvatar";
import { formatText } from "../../utils/formatText";
import { useNavigate } from "react-router-dom";

interface GroupChats {
    chatId: number;
    title: string;
    groupAvatar: string;
    members: string[]
}

export default function ListGroupChats({groupChats}:{groupChats:GroupChats[]}) {

    const navigate = useNavigate();

    const openChat = (chatId: number) => {
        navigate('/messages', { state: { chatId: chatId, isGroupChat: true } });
    };

    return (
        <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
            <Typography variant="h6" fontSize={20} fontWeight={"bold"} gutterBottom>
                {groupChats.length} groups in common
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
                    {groupChats.map((group, index) => (
                    <Button
                        key={group.chatId}
                        sx={{
                            color: 'primary', 
                            borderBottom: index !== groupChats.length - 1 ? 'solid rgba(128, 128, 128, 0.2) 0.5px' : 'none',
                            width: '100%',
                            textTransform: 'none',
                            fontSize: '20px',
                            display: 'flex',
                            padding: '5px 10px 5px 10px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }} 
                        onClick={()=>openChat(group.chatId)}
                    >
                        <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <ProfileAvatar avatarPath={group.groupAvatar} username={group.title} height={'40px'} width={'40px'}/>
                            <Stack direction="column" spacing={-0.5} sx={{ justifyContent: "center", alignItems: "flex-start",}}>
                                <Typography fontSize={17} sx={{color: '#ece5dd'}}>{formatText(group.title,19)}</Typography>
                                <Typography fontSize={14} sx={{opacity: 0.5, color:'#ece5dd'}}>{formatText((group.members).join(', '),30)}</Typography>
                            </Stack>
                        </Stack>
                        <ArrowIcon sx={{opacity: 0.3, color:'#ece5dd'}}/>
                    </Button>
                    ))}
                </Stack>
            </Paper>
        </div>
    )
}