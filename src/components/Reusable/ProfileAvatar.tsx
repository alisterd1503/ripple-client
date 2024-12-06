import { useState, useEffect } from 'react';
import { Avatar, Badge, styled } from '@mui/material';
import stringAvatar from '../../utils/stringAvatar';
const API_URL = `${process.env.REACT_APP_API_URL}`;

interface ProfileAvatarProps {
    avatarPath?: string | undefined;
    width?: string | number;
    height?: string | number;
    username: string | undefined;
    onClick?: () => void;
    isOnline?: boolean;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}));

export default function ProfileAvatar({ avatarPath, width, height, username, onClick, isOnline }: ProfileAvatarProps) {
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (avatarPath) {
            const fullAvatarUrl = `${API_URL}${avatarPath}`;
            setAvatarUrl(fullAvatarUrl);
        }
    }, [avatarPath]);

    const avatar = avatarUrl ? (
        <Avatar
            src={avatarUrl}
            alt={username}
            onClick={onClick}
            sx={{
                width: width || "60px",
                height: height || "60px",
                color: '#ece5dd',
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
                    color: '#ece5dd',
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
                    color: '#ece5dd',
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
    );

    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant={isOnline ? "dot" : undefined}
        >
            {avatar}
        </StyledBadge>
    );
}
