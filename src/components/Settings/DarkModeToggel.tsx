import { Button, FormControlLabel, Stack, Typography } from "@mui/material";
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';
import { AppleSwitch } from "./IOSSwitch";

interface DarkModeToggelProps {
    mode: 'light' | 'dark';
    toggleTheme: () => void
}

export default function DarkModeToggel({
    mode,
    toggleTheme
}: DarkModeToggelProps) {
    return (
        <Button
            sx={{
                color: '#ece5dd',
                width: '100%',
                textTransform: 'none',
                fontSize: '20px',
                display: 'flex',
                padding: '10px 20px 10px 20px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                {mode === 'dark' ? <DarkIcon/> : <LightIcon/>}
                <Typography>Dark mode</Typography>
            </Stack>
            <FormControlLabel
                control={<AppleSwitch onChange={toggleTheme} checked={mode === 'dark'}/>}
                label=''
            />
        </Button>
    );
}
