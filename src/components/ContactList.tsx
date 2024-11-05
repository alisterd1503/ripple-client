import { Avatar, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface Contact {
  userId: number;
  chatId: number;
  username: string;
}

interface ContactListProps {
  currentUserId: number;
}

export default function ContactList({ currentUserId }: ContactListProps) { 
  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    axios.get<Contact[]>(`http://localhost:5002/api/getUserChat?userId=${currentUserId}`)
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, [currentUserId]);

  const openChat = (chatId: number) => {
    console.log('hello')
  };

  return (
      <>
      {contacts.map((user) => (
        <Button
          key={user.chatId}
          onClick={() => openChat(user.chatId)}
          style={{
            backgroundColor: 'transparent',
            borderTop: 'solid gray 0.5px',
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
