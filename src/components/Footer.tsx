import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

//TODO, FIX BOTTOM NAVIGATION

export default function ContactsPage() {
    const [activeTab, setActiveTab] = useState<string>('');
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    
        if (newValue === 'settings') {
          navigate('/settings');
        } else if (newValue === 'chats') {
          navigate('/contacts');
        }
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%' }} elevation={3}>
            <BottomNavigation
                showLabels
                value={activeTab}
                onChange={handleChange}
                sx={{ backgroundColor: 'primary' }}
            >
                <BottomNavigationAction
                label="Favourites"
                value="favourites"
                icon={<StarBorderOutlinedIcon fontSize="medium" />}
                />
                <BottomNavigationAction
                label="Chats"
                value="chats"
                icon={<QuestionAnswerOutlinedIcon fontSize="medium" />}
                />
                <BottomNavigationAction
                label="Settings"
                value="settings"
                icon={
                    <TuneOutlinedIcon fontSize="medium" />
                }
                />
            </BottomNavigation>
        </Paper>
    )
}
