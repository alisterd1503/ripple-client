import { Backdrop, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PenIcon from '@mui/icons-material/EditOutlined';
import PhotoIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import TextIcon from '@mui/icons-material/ShortTextOutlined';
import { convertISODate } from "../../utils/convertISODate";
import SettingsButton from "../SettingPage/SettingsButton";
import ListMembers from "./ListMembers";
import ProfileButton from "./ProfileButton";
import { leaveGroup } from "../../api/ProfileAPI/leaveGroup";
import UpdateTitle from "../GroupChatSettings/UpdateTitle";
import UpdateDescription from "../GroupChatSettings/UpdateDescription";
import UploadGroupAvatar from "../GroupChatSettings/UploadGroupAvatar";
import ProfileAvatar from "../Reusable/ProfileAvatar";
import { getGroupProfile } from "../../api/ProfileAPI/getGroupProfile";
import { favouriteChat } from "../../api/ProfileAPI/favouriteChat";
import AddPersonIcon from '@mui/icons-material/PersonAddAltOutlined';
import RemovePersonIcon from '@mui/icons-material/PersonRemoveOutlined';
import AddMembers from "../GroupChatSettings/AddMembers";
import RemoveMember from "../GroupChatSettings/RemoveMember";
import { GroupProfileModel } from "../../models/GroupProfileModel";

export default function GCProfilePage({chatId}:{chatId: number}) {
    const navigate = useNavigate();

    const [openBackdrop, setOpenBackdrop] = useState<string | null>(null);
    const [profile , setProfile] = useState<GroupProfileModel>()

    useEffect(() => {
        const fetchProfile = async () => {
          const result = await getGroupProfile(chatId);
          setProfile(result)
        };
    
        fetchProfile();
    }, [chatId]);

    const handleClose = () => {
        setOpenBackdrop(null);
    };

    const handleButtonClick = (action: string) => {
        setOpenBackdrop(action);
    };

    const handleLeaveGroup = async () => {
        try {
            await leaveGroup(chatId);
            navigate('/contacts')
        } catch (error) {
            console.error("Error leaving group:", error);
        }
    }

    return (
        <>
        {profile &&
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

                <ProfileAvatar avatarPath={profile.groupAvatar} username={profile.title} width={'100px'} height={'100px'}/>
                
                <Typography variant="h3" fontWeight={"bold"} fontSize={30} textAlign={'center'}>
                        {profile.title}
                </Typography>

                <Typography variant="h6" fontSize={20} gutterBottom sx={{opacity: 0.4}}>
                        {profile.members.length} members
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
                        <Typography sx={{padding: '10px', opacity: 0.7}}>{profile.description}</Typography>
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

                <ListMembers members={profile.members}/>

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
                            onClick={() => handleButtonClick("add")}
                            icon={<AddPersonIcon />}
                            text="Add User"
                        />
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
                            onClick={() => handleButtonClick("remove")}
                            icon={<RemovePersonIcon />}
                            text="Remove User"
                            red
                        />
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
                        {profile.is_favourite ? 
                        (<ProfileButton  text="Remove from Favourites" Red
                            onClick={() => {favouriteChat({ isFavourite: false, chatId: chatId });window.location.reload();} } 
                        />) 
                        : 
                        (<ProfileButton text="Add to Favourites" 
                            onClick={() => {favouriteChat({ isFavourite: true, chatId: chatId });window.location.reload();} } 
                        />)}
                        <ProfileButton onClick={handleLeaveGroup} text="Leave Group" Red NotLast/>
                    </Stack>
                </Paper>

                <Typography sx={{opacity: 0.4, width: '100%'}}>{convertISODate(profile.created_at,'profile')}</Typography>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={openBackdrop === "avatar"}
                    onClick={handleClose}
                >
                    <UploadGroupAvatar title={profile.title} currentAvatar={profile.groupAvatar} chatId={chatId} onClick={(e) => e.stopPropagation()}/>
                </Backdrop>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={openBackdrop === "description"}
                    onClick={handleClose}
                >
                    <UpdateDescription chatId={chatId} description={profile.description} onClick={(e) => e.stopPropagation()}/>
                </Backdrop>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={openBackdrop === "title"}
                    onClick={handleClose}
                >
                    <UpdateTitle chatId={chatId} title={profile.title} onClick={(e) => e.stopPropagation()}/>
                </Backdrop>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={openBackdrop === "add"}
                    onClick={handleClose}
                >
                    <AddMembers chatId={chatId} onClick={(e) => e.stopPropagation()}/>
                </Backdrop>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={openBackdrop === "remove"}
                    onClick={handleClose}
                >
                    <RemoveMember chatId={chatId} onClick={(e) => e.stopPropagation()} groupMembers={profile.members}/>
                </Backdrop>

            </Stack>
        }
        </>

        
    )
}