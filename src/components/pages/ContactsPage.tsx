import { useState, useEffect } from "react";
import Header from "../Header";
import { Stack, Typography } from "@mui/material";
import ContactList from "../ContactList";
import FindUsers from "../FindUsers";
//import FindUsers from "../FindUsers";

interface User {
    id: number;
    username: string;
}

export default function ContactsPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
        const currentUser = JSON.parse(storedUser)
        setCurrentUser(currentUser)
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
                <FindUsers currentUserId={currentUser.id} />
                <Typography variant="h3" fontWeight={"bold"} gutterBottom>
                    Chats
                </Typography>
                <ContactList currentUserId={currentUser.id} />
            </Stack>
        </>}
        </>
    )
}