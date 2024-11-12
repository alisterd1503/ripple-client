import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, Stack,  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import GroupIcon from '@mui/icons-material/Group';
import { ChatModel } from '../../models/ChatModel';
import ProfileAvatar from '../Reusable/ProfileAvatar';

export default function ChatHeader({body}:{body: ChatModel}) {
    const navigate = useNavigate(); 

    const openProfile = (body: ChatModel) => {
        navigate('/profile', { state: { body } });
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
                        <ArrowBackIosNewIcon fontSize="large" sx={{ color: 'white' }} />
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
                        {body.isGroupChat ? 
                        (<Avatar 
                            sx={{width: '40px', height: '40px', color: 'white', transition: '0.3s',
                            '&:hover': { cursor: 'pointer', opacity: 0.8, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)' }}} 
                            onClick={()=>openProfile(body)}
                        >
                            <GroupIcon />
                        </Avatar>) 
                        : 
                        (<ProfileAvatar avatarPath={body.participants[0].avatar} username={body.participants[0].username} height='40px' width='40px' onClick={()=>openProfile(body)}/>)}
                        <Typography variant="h4" component="div" fontWeight={'10px'} sx={{ flexGrow: 1, textAlign: 'center' }}>
                            {body.isGroupChat ? body.title : body.participants[0].username}
                        </Typography>
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
                        <MenuIcon fontSize='large' sx={{ color: 'white' }}/>
                    </button>
                </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
