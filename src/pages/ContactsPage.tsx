import { useState, useEffect } from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import ContactList from "../components/ContactList";
import FindUsers from "../components/FindUsers";
import { jwtDecode } from "jwt-decode"
import { UserModel } from "../models/UserModel";
import Footer from "../components/Footer";



export default function ContactsPage() {
    const [currentUser, setCurrentUser] = useState<UserModel | null>(null);

    // Getting jwt token for logged in user
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<{ username: string, userId: number }>(token);
        const body: UserModel = {
            username: decodedToken.username,
            userId: decodedToken.userId
        }
        setCurrentUser(body);
    }
    }, []);

    return (
        <>
        {currentUser && <>
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
        </>}
        </>
    )
}