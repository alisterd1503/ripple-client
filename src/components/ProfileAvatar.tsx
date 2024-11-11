import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import stringAvatar from '../utils/stringAvatar';

interface ProfileAvatarProps {
    avatarPath?: string | undefined;
    width?: string;
    height?: string;
    username: string | undefined;
    onClick?: () => void;
}

export default function ProfileAvatar({ avatarPath, width, height, username, onClick }: ProfileAvatarProps) {
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (avatarPath) {
            const fullAvatarUrl = `http://localhost:5002${avatarPath}`;
            setAvatarUrl(fullAvatarUrl);
        }
    }, [avatarPath]);

    return (
        avatarUrl ? 
        (
            <Avatar
                src={avatarUrl}
                alt={username}
                onClick={onClick}
                sx={{
                    width: width || "60px",
                    height: height || "60px",
                    transition: '0.3s',
                    '&:hover': onClick ? {
                        cursor: 'pointer',
                        opacity: 0.8,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                    } : undefined,
                }}
            />
        ) : (
            username ? (
                <Avatar 
                    {...stringAvatar(username)} 
                    alt={username} 
                    onClick={onClick}
                    sx={{
                        width: width || '60px',
                        height: height || '60px',
                        color: 'white',
                        transition: '0.3s',
                        '&:hover': onClick ? {
                            cursor: 'pointer',
                            opacity: 0.8,
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        } : undefined,
                    }}
                />
            ) : (
                <Avatar 
                    sx={{
                        width: width || '60px',
                        height: height || '60px',
                        bgcolor: 'lightgray',
                        transition: '0.3s',
                        '&:hover': onClick ? {
                            cursor: 'pointer',
                            opacity: 0.8,
                            transform: 'scale(1.05)',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                        } : undefined,
                    }}
                    onClick={onClick}
                />
            )
        )
    );
}
