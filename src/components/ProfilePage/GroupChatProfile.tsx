import { Avatar, Backdrop, Paper, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import { useState } from "react";
import PenIcon from '@mui/icons-material/EditOutlined';
import PhotoIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import TextIcon from '@mui/icons-material/ShortTextOutlined';
import { ChatModel } from "../../models/ChatModel";
import { convertISODate } from "../../utils/convertISODate";
import SettingsButton from "../SettingPage/SettingsButton";
import ListMembers from "./ListMembers";
import ProfileButton from "./ProfileButton";
import { leaveGroup } from "../../api/ProfileAPI/leaveGroup";
import UpdateTitle from "../GroupChatSettings/UpdateTitle";

export default function GCProfilePage({body}:{body: ChatModel}) {
    const navigate = useNavigate();

    const [openBackdrop, setOpenBackdrop] = useState<string | null>(null);

    const handleClose = () => {
        setOpenBackdrop(null);
    };

    const handleButtonClick = (action: string) => {
        setOpenBackdrop(action);
    };

    const handleLeaveGroup = async () => {
        try {
            await leaveGroup(body.chatId);
            navigate('/contacts')
        } catch (error) {
            console.error("Error leaving group:", error);
        }
    }

    return (
        <Stack
            direction="column"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                padding: '10px'
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: '100%'
                }}
            >
                <button
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={() => navigate("/contacts")}
                    >
                        <ArrowBackIosNewIcon fontSize="medium" sx={{ color: 'white' }} />
                    </button>
                    <Typography variant="h6" fontWeight={"bold"} fontSize={20} gutterBottom>Group Info</Typography>
                    <Typography variant="h6" fontSize={18} gutterBottom>Edit</Typography>
            </Stack>

            <Avatar sx={{width: '100px', height: '100px', color: 'white'}}><GroupIcon /></Avatar>
            <Typography variant="h3" fontWeight={"bold"} fontSize={30} gutterBottom>
                    {body.title}
            </Typography>

            <Typography variant="h6" fontSize={20} gutterBottom sx={{opacity: 0.4}}>
                    {body.participants.length} members
            </Typography>

            <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography sx={{padding: '10px', opacity: 0.7}}>{body.description}</Typography>
                </Stack>
            </Paper>

            <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <Typography sx={{padding: '10px', opacity: 0.7}}>Created: {convertISODate(body.added_at)}</Typography>
                </Stack>
            </Paper>

            <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <SettingsButton 
                        onClick={() => handleButtonClick("title")}
                        icon={<PenIcon/>}
                        text="Edit title"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("description")}
                        icon={<TextIcon />}
                        text="Edit description"
                    />
                    <SettingsButton 
                        onClick={() => handleButtonClick("avatar")}
                        icon={<PhotoIcon />}
                        text="Change group picture"
                    />
                </Stack>
            </Paper>

            <ListMembers members={body.participants} count={body.participants.length}/>

            <Paper elevation={1} sx={{ width: '100%', borderRadius: '7px', }}>
                <Stack
                    direction="column"
                    spacing={0}
                    sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                    }}
                >
                    <ProfileButton text="Add to Favourites"/>
                    <ProfileButton onClick={handleLeaveGroup} text="Leave Group" red/>
                </Stack>
            </Paper>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "avatar"}
                onClick={handleClose}
            >
                <TextField label="avatar"/>
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "description"}
                onClick={handleClose}
            >
                <TextField label="description"/>
            </Backdrop>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={openBackdrop === "title"}
                onClick={handleClose}
            >
                <UpdateTitle chatId={body.chatId} title={body.title} onClick={(e) => e.stopPropagation()}/>
            </Backdrop>

        </Stack>

        
    )
}