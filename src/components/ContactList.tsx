import { Avatar, AvatarGroup, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getContacts } from "../api/getContacts";
import { useNavigate } from "react-router-dom";
import { ContactModel } from "../models/ContactModel";
import ProfileAvatar from "./ProfileAvatar";
import GroupIcon from '@mui/icons-material/Group';
import { ChatModel } from "../models/ChatModel";

function convertISODate(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const formattedDate = date.toLocaleDateString('en-GB');
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const dayOfWeek = date.toLocaleDateString('en-GB', { weekday: 'long' });

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return formattedTime;
  }

  // Check if the date is within the current week
  const dayDifference = (now.getDay() + 7 - date.getDay()) % 7;
  const isThisWeek = dayDifference < now.getDay() && dayDifference >= 0;

  if (isThisWeek) {
    return dayOfWeek;
  }

  // For any other dates, return the formatted date (dd/mm/yyyy)
  return formattedDate;
}

function formatLastMessage(lastMessage: string): string {
  let formattedMessage = ''
  if (!lastMessage) {
    formattedMessage = 'Start Chat...'
    return formattedMessage
  }
  lastMessage.length > 70 ? formattedMessage = lastMessage.substring(0, 70) + '...' : formattedMessage = lastMessage
  return formattedMessage
}

export default function ContactList() { 
  const [contacts, setContacts] = useState<ContactModel[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await getContacts();
      console.log(result)
      setContacts(result);
    };

    fetchContacts();

    const interval = setInterval(() => {
      fetchContacts();
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);

  const openChat = (user: ContactModel) => {
    const body: ChatModel = {
      chatId: user.chatId,
      title: user.isGroupChat ? user.title : user.participants[0].username,
      added_at: user.added_at,
      isGroupChat: user.isGroupChat,
      participants: user.participants,
    };
    navigate('/messages', { state: { body } });
  };

  return (
      <>
        {contacts.map((user) => (
          <Button
            key={user.chatId}
            onClick={() => openChat(user)}
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
            {user.isGroupChat ? 
              (<Avatar sx={{width: '60px', height: '60px', color: 'white'}}><GroupIcon /></Avatar>) 
              :
              (
                <ProfileAvatar 
                avatarPath={user.participants[0].avatar} 
                username={user.participants[0].username}
                />
              )
            }

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
              <Typography variant="body1">{user.isGroupChat ? user.title : user.participants[0].username}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{textAlign: 'left'}}>{formatLastMessage(user.lastMessage)}</Typography>
            </Stack>
            <Stack
              direction="column"
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="body2">{convertISODate(user.lastMessageTime)}</Typography>
            </Stack>
          </Stack>
          </Button>
        ))}
      </>
  )
}
