import { Button, Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import FindUsers from "../components/FindUsers";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("currentUser");
        navigate("/")
    };

    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                padding: '10px'
            }}
        >
            <Typography variant="h3" fontWeight={"bold"} fontSize={35} gutterBottom>
                    Settings
            </Typography>
            <FindUsers/>
            <Button variant="outlined" color="error" sx={{width: "100%"}} onClick={logout}>Log Out</Button>
            <Footer/>
        </Stack>
        
    )
}