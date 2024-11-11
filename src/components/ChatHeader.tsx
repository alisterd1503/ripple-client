import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack,  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProfileAvatar from './ProfileAvatar';

export default function ChatHeader({ title, avatar, bio, added_at, chatId }: { title: string, avatar: string, bio: string, added_at:string, chatId: number }) {
    const navigate = useNavigate(); 

    const openProfile = (username: string, avatar: string, bio: string, added_at: string, chatId: number) => {
        navigate('/profile', { state: { username, avatar, bio, added_at, chatId } });
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
                        onClick={() => navigate("/contacts")}
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
                        <ProfileAvatar avatarPath={avatar} username={title} height='40px' width='40px' onClick={()=>openProfile(title, avatar, bio, added_at, chatId)}/>
                        <Typography variant="h4" component="div" fontWeight={'10px'} sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {title}
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
