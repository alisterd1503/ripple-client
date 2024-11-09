import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import ContactList from "../components/ContactList";
import FindUsers from "../components/FindUsers";
import Footer from "../components/Footer";



export default function ContactsPage() {
    return (
        <>
            <AppBar 
                position="sticky" 
                sx={{ 
                    zIndex: 1100, 
                    backgroundColor: 'primary', 
                    boxShadow: 'none',
                }}
                elevation={0}
            >
                <Toolbar>
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