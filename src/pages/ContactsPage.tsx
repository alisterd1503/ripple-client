import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import Footer from "../components/Footer";
import ContactList from "../components/ContactPage/ContactList";
import FindUsers from "../components/ContactPage/FindUsers";

export default function ContactsPage() {
    return (
        <>
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
                    padding: '10px'
                }}
                >
                <Typography variant="h3" fontWeight={"bold"} fontSize={35} gutterBottom>
                    Chats
                </Typography>
                <ContactList />
                <Footer/>
            </Stack>
        </>
    )
}