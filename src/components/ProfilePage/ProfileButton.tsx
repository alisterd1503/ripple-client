import { Button, Stack, Typography } from "@mui/material";

interface SettingsButtonProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    text: string;
    Red?: boolean;
    NotLast?: boolean;
}

export default function ProfileButton({
    
    onClick,
    text,
    Red,
    NotLast,
}: SettingsButtonProps) {
    return (
        <Button
            sx={{
                color: Red ? '#DD5F70' : '#25B567', 
                borderBottom: NotLast ? '' : 'solid rgba(128, 128, 128, 0.2) 0.5px', 
                width: '100%',
                textTransform: 'none',
                fontSize: '20px',
                display: 'flex',
                padding: '10px 20px 10px 20px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }} 
            onClick={onClick}
        >
            <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography>{text}</Typography>
            </Stack>
        </Button>
    );
}
