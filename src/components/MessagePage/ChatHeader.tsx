import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack,  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ChatModel } from '../../models/ChatModel';
import ProfileAvatar from '../Reusable/ProfileAvatar';
import { formatText } from '../../utils/formatText';

export default function ChatHeader({body}:{body: ChatModel}) {
    const navigate = useNavigate();

    const title: string = body.isGroupChat ? body.title : body.username
    const usernames: string  = body.members ? (body.members).join(', ') : ''

    const openProfile = (chatId: number, isGroupChat: boolean) => {
        navigate('/profile', { state: { chatId, isGroupChat } });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: '100%',
                        height: '80px',
                    }}
                >
                    {/* Back Button */}
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
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIosNewIcon fontSize="medium" sx={{ color: 'white' }} />
                    </button>

                    {/* Name Logo Stack */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ProfileAvatar 
                            avatarPath={body.isGroupChat ? body.groupAvatar : body.avatar} 
                            username={title}
                            height='50px' width='50px'
                        />
                        <Stack direction="column" spacing={-0.5} sx={{ justifyContent: "center", alignItems: "flex-start" }}>
                            <Typography variant="h5" component="div" fontWeight={'bold'} fontSize={25} sx={{ flexGrow: 1, textAlign: 'center' }}>
                                {formatText(title,16)}
                            </Typography>
                            {body.isGroupChat &&
                            <Typography variant="body2" color="textSecondary" sx={{textAlign: 'left'}}>
                                {formatText(usernames,25)}
                            </Typography>
                            }
                        </Stack>
                    </Stack>

                    {/* Menu Icon Button */}
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
                    >
                        <MenuIcon fontSize='medium' sx={{ color: 'white' }} onClick={()=>openProfile(body.chatId, body.isGroupChat)}/>
                    </button>
                </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
