import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProfileAvatar from '../Reusable/ProfileAvatar';
import { formatText } from '../../utils/formatText';
import { useEffect, useState } from 'react';
import { getChatHeader } from '../../api/MessagesAPI/getChatHeader';

interface ChatModel {
    avatar: string;
    title: string;
    username: string;
    userId: number;
    groupAvatar: string;
    chatId: number;
    isGroupChat: boolean;
    members: string[];
}

export default function ChatHeader({ chatId }: { chatId: number }) {
    const navigate = useNavigate();
    const [header, setHeader] = useState<ChatModel>();

    useEffect(() => {
        const fetchChatHeader = async () => {
            try {
                const result = await getChatHeader(chatId);
                setHeader(result);
            } catch (error) {
                console.error('Error fetching chat header:', error);
            }
        };
        fetchChatHeader();
    });

    const title = header?.isGroupChat ? header.title : header?.username;
    const usernames = header?.members.join(', ');

    const openProfile = () => {
        if (header) {
            navigate('/profile', {
                state: {
                    chatId: header.chatId,
                    isGroupChat: header.isGroupChat,
                    userId: header.userId,
                },
            });
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {(header && title) && (
            <AppBar position="static">
                <Toolbar>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
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
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ProfileAvatar
                                avatarPath={header.isGroupChat ? header.groupAvatar : header.avatar}
                                username={title}
                                height="50px"
                                width="50px"
                            />
                            <Stack
                                direction="column"
                                spacing={-0.5}
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="div"
                                    fontWeight="bold"
                                    fontSize={25}
                                    sx={{ flexGrow: 1, textAlign: 'center' }}
                                >
                                    {formatText(title, 10)}
                                </Typography>
                                {(header.isGroupChat && usernames) && (
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ textAlign: 'left' }}
                                    >
                                        {formatText(usernames, 25)}
                                    </Typography>
                                )}
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
                            onClick={openProfile}
                        >
                            <MenuIcon fontSize="medium" sx={{ color: 'white' }} />
                        </button>
                    </Stack>
                </Toolbar>
            </AppBar>
            )}
        </Box>
    );
}
