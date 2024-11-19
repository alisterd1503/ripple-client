import { useLocation } from "react-router-dom";
import GCProfilePage from "../components/ProfilePage/GroupChatProfile";
import UserProfilePage from "../components/ProfilePage/UserProfile";

export default function ProfilePage() {
    const location = useLocation();
    const { chatId, isGroupChat, userId } = location.state as { chatId: number, isGroupChat: boolean, userId: number };

    return (
        <>
            {isGroupChat ? (<GCProfilePage chatId={chatId}/>) : (<UserProfilePage userId={userId}/>)}
        </>
    )
}