import { useLocation } from "react-router-dom";
import { ChatModel } from "../models/ChatModel";
import GCProfilePage from "../components/ProfilePage/GroupChatProfile";
import UserProfilePage from "../components/ProfilePage/UserProfile";

export default function ProfilePage() {
    const location = useLocation();
    const { body } = location.state as { body: ChatModel };

    return (
        <>
            {body.isGroupChat ? (<GCProfilePage body={body}/>) : (<UserProfilePage body={body.participants[0]} chatId={body.chatId}/>)}
        </>
    )
}