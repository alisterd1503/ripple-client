import { Badge, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../../api/getContacts";
import { ContactModel } from "../../models/ContactModel";
import { convertISODate } from "../../utils/convertISODate";
import ProfileAvatar from "../Reusable/ProfileAvatar";
import ImageIcon from '@mui/icons-material/Image';
import { formatText } from "../../utils/formatText";
import { MessagePreviewModel } from "../../models/MessagePreviewModel";

function MessagePreview({ message, username, isGroupChat, isImage, hasRead }: MessagePreviewModel) {
  if (!message) 
    return <Typography sx={{ opacity: 0.5, fontSize: 15, color: '#ece5dd' }}>Start Chat...</Typography>;

  return (
    <Stack direction="row" spacing={0.5} sx={{ justifyContent: "center", alignItems: "center", opacity: hasRead ? 0.5 : 1 }}>
      {isGroupChat && <Typography sx={{color: '#ece5dd'}}>{username}:</Typography>}
      {isImage ? <ImageIcon fontSize="small" />:<Typography sx={{color: '#ece5dd'}}>{formatText(message,(21-username.length))}</Typography>}
    </Stack>
  );
}

export default function ContactList({favourites}:{favourites?: boolean}) { 
  const [contacts, setContacts] = useState<ContactModel[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      const result = await getContacts();
      const filteredContacts = result.filter((contact: ContactModel) => contact.isFavourite);
      favourites ? setContacts(filteredContacts) : setContacts(result)
    };

    fetchContacts();

    const interval = setInterval(() => {
      fetchContacts();
    }, 5000);
  
    return () => clearInterval(interval);
  }, [favourites]);

  const openChat = (user: ContactModel) => {
    navigate('/messages', { state: { chatId: user.chatId, isGroupChat: user.isGroupChat } });
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
            spacing={0}
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
              isOnline={user.isOnline}
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
              <Typography variant="body1" fontWeight={'bold'} sx={{color: '#ece5dd'}}>{user.isGroupChat ? formatText(user.title,16) : user.username}</Typography>
              <MessagePreview message={user.lastMessage} username={user.lastMessageSender} isGroupChat={user.isGroupChat} isImage={user.isImage} hasRead={user.readLastMessage}/>
            </Stack>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{
                justifyContent: "center",
                alignItems: "flex-end"
              }}
            >
              <Typography variant="body2" sx={{opacity: user.readLastMessage ? 0.5 : 1, color: user.readLastMessage ? '#ece5dd' : '#25d366'}}>{user.lastMessageTime ? convertISODate(user.lastMessageTime, 'contacts') : ''}</Typography>
              {user.unReadMessages > 0 && 
              <Badge badgeContent={user.unReadMessages} sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#25d366',
                  color: 'black',
                  marginRight: '10px'
                },
              }}/>}
            </Stack>
          </Stack>
          </Button>
        ))}
      </>
  )
}
