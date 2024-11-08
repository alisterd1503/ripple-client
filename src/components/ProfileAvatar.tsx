import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import stringAvatar from '../utils/stringAvatar';

interface ProfileAvatarProps {
    avatarPath: string | undefined
    width?: string,
    height?: string
    username: string | undefined
}
  
  export default function ProfileAvatar({ avatarPath, width, height, username }: ProfileAvatarProps) {
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
            <Avatar src={avatarUrl} alt={username} sx={{ width: width ? width : "60px", height: height ? height : "60px" }} />
        ) : (
            username ? (
                <Avatar {...stringAvatar(username)} alt={username} sx={{ width: width ? width : '60px', height: height ? height : '60px', color: 'white' }} />
            ) : (
                <Avatar sx={{ width: width ? width : '60px', height: height ? height : '60px', bgcolor: 'lightgray' }} />
            )
        )
    )   ;
}
