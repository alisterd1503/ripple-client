import { Button, Stack, Typography } from "@mui/material";
import ArrowIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

interface SettingsButtonProps {
    onClick?: () => void;
    icon?: React.ReactNode;
    text: string;
    red?: boolean;
    single?: boolean;
}

export default function SettingsButton({
    onClick,
    icon,
    text,
    red,
    single
}: SettingsButtonProps) {
    return (
        <Button
            sx={{
                color: red ? '#DD5F70' : 'primary', 
                borderBottom: single ? 'none':'solid rgba(128, 128, 128, 0.2) 0.5px', 
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
                {icon}
                <Typography>{text}</Typography>
            </Stack>
            <ArrowIcon sx={{opacity: 0.3}}/>
        </Button>
    );
}
