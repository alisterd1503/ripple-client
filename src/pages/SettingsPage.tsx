import { Stack, Typography } from "@mui/material";
import Footer from "../components/Footer";
import FindUsers from "../components/FindUsers";

export default function SettingsPage() {
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
            <Footer/>
        </Stack>
        
    )
}