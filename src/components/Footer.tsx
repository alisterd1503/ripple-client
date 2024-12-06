import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

export default function ContactsPage() {
    const [activeTab, setActiveTab] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === "/settings") {
            setActiveTab("settings");
        } else if (currentPath === "/contacts") {
            setActiveTab("chats");
        } else if (currentPath === "/favourites") {
            setActiveTab("favourites");
        }
    }, [location.pathname]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);

        if (newValue === "settings") {
            navigate("/settings");
        } else if (newValue === "chats") {
            navigate("/contacts");
        } else if (newValue === "favourites") {
            navigate("/favourites");
        }
    };

    return (
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100%" }} elevation={3}>
            <BottomNavigation
                showLabels
                value={activeTab}
                onChange={handleChange}
                sx={{ backgroundColor: '#252b27' }}
            >
                <BottomNavigationAction
                    label="Favourites"
                    value="favourites"
                    icon={<StarBorderOutlinedIcon fontSize="medium" />}
                    sx={{'&.Mui-selected': {
                        color: '#ece5dd',
                    },}}
                />
                <BottomNavigationAction
                    label="Chats"
                    value="chats"
                    icon={<QuestionAnswerOutlinedIcon fontSize="medium" />}
                    sx={{'&.Mui-selected': {
                        color: '#ece5dd',
                    },}}
                />
                <BottomNavigationAction
                    label="Settings"
                    value="settings"
                    icon={<TuneOutlinedIcon fontSize="medium" />}
                    sx={{'&.Mui-selected': {
                        color: '#ece5dd',
                    },}}
                />
            </BottomNavigation>
        </Paper>
    );
}
