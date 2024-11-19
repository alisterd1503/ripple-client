import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../../api/getContacts";
import { ChatModel } from "../../models/ChatModel";
import { ContactModel } from "../../models/ContactModel";
import { convertISODate } from "../../utils/convertISODate";
import ProfileAvatar from "../Reusable/ProfileAvatar";
import ImageIcon from '@mui/icons-material/Image';

interface MessagePreviewProps {
  message: string;
  username: string;
  isGroupChat: boolean;
  isImage: boolean;
}

function MessagePreview({ message, username, isGroupChat, isImage }: MessagePreviewProps) {
  if (!message) 
    return <Typography sx={{ opacity: 0.5, fontSize: 15 }}>Start Chat...</Typography>;

  return (
    <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center", opacity: 0.5 }}>
      {isGroupChat && <Typography>{username}:</Typography>}
      {isImage ? <ImageIcon fontSize="small" /> : <Typography>{message}</Typography>}
    </Stack>
  );
}

export default function ContactList() { 
  const [contacts, setContacts] = useState<ContactModel[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await getContacts();
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
      title: user.title,
      username: user.username,
      userId: user.userId,
      groupAvatar: user.groupAvatar,
      isGroupChat: user.isGroupChat,
      members: user.members,
      avatar: user.avatar
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
            <ProfileAvatar 
              avatarPath={user.isGroupChat ? user.groupAvatar : user.avatar} 
              username={user.isGroupChat ? user.title : user.username}
            />

            <Stack
              direction="column"
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                flexGrow: 1,
                padding: '16px',
              }}
            >
              <Typography variant="body1">{user.isGroupChat ? user.title : user.username}</Typography>
              <MessagePreview message={user.lastMessage} username={user.lastMessageSender} isGroupChat={user.isGroupChat} isImage={user.isImage}/>
            </Stack>
            <Stack
              direction="column"
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="body2">{user.lastMessageTime ? convertISODate(user.lastMessageTime, 'contacts') : ''}</Typography>
            </Stack>
          </Stack>
          </Button>
        ))}
      </>
  )
}
