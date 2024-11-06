import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Stack, Typography } from "@mui/material";
import ContactList from "../components/ContactList";
import FindUsers from "../components/FindUsers";
import { jwtDecode } from "jwt-decode"
import { UserModel } from "../models/UserModel";

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
            <Header username={currentUser.username}/>
            <Stack
                direction="column"
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    width: "100%",
                }}
                >
                <FindUsers />
                <Typography variant="h3" fontWeight={"bold"} gutterBottom>
                    Chats
                </Typography>
                <ContactList />
            </Stack>
        </>}
        </>
    )
}