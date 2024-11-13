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
                        <ProfileAvatar 
                            avatarPath={body.isGroupChat ? body.groupAvatar : body.participants[0].avatar} 
                            username={body.isGroupChat ? body.title : body.participants[0].username}
                            onClick={()=>openProfile(body)}
                            height='40px' width='40px'
                        />

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
