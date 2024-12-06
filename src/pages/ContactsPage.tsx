import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Footer from "../components/Footer";
import ContactList from "../components/ContactPage/ContactList";
import FindUsers from "../components/ContactPage/FindUsers";
import chatBackground from '../ripplebg.png';

export default function ContactsPage() {
    return (
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            flexGrow: 1,
            overflow: "auto",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${chatBackground})`,
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundColor: "transparent",
        }}>
            <AppBar 
                position="sticky" 
                sx={{ 
                    zIndex: 1100, 
                    backgroundColor: 'primary', 
                    boxShadow: 'none',
                    padding: 0
                }}
                elevation={0}
            >
                <Toolbar sx={{padding: '10px 10px 10px 10px'}}>
                    <FindUsers />
                </Toolbar>
            </AppBar>
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                    padding: '20px'
                }}
                >
                <Typography variant="h3" fontWeight={"bold"} fontSize={35} gutterBottom>
                    Chats
                </Typography>
                <ContactList />
                <Footer/>
            </Stack>
        </div>
    )
}