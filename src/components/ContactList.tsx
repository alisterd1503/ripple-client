import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getContacts } from "../api/getContacts";
import { useNavigate } from "react-router-dom";
import { ContactModel } from "../models/ContactModel";

export default function ContactList() { 
  const [contacts, setContacts] = useState<ContactModel[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
        const result = await getContacts();
        setContacts(result);
    };
    fetchContacts();
  }, []);

  const openChat = (chatId: number, username: string) => {
    navigate('/messages', { state: { chatId, username } });
  };

  return (
      <>
      {contacts.map((user) => (
        <Button
          key={user.chatId}
          onClick={() => openChat(user.chatId, user.username)}
          style={{
            backgroundColor: 'transparent',
            borderBottom: 'solid rgba(128, 128, 128, 0.2) 0.1px',
            borderRadius: '0px',
            borderLeft: 'none',
            cursor: 'pointer',
            width: '100%',
            textTransform: 'none',
            transition: 'background-color 0.3s ease',
            marginTop: 0.5,
            padding: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            height: '80px',
            width: '100%',
          }}
        >
          <Avatar style={{ width: "60px", height: "60px" }}>{(user.username[0]).toUpperCase()}</Avatar>
          <Stack
            direction="column"
            spacing={0}
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
              flexGrow: 1,
              paddingLeft: '16px',
            }}
          >
            <Typography variant="body1">{user.username}</Typography>
            <Typography variant="body2" color="textSecondary">Last Message...</Typography>
          </Stack>
          <Stack
            direction="column"
            spacing={0}
            sx={{
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Typography variant="body2">Time</Typography>
          </Stack>
        </Stack>
        </Button>
      ))}
      </>
  )
}
