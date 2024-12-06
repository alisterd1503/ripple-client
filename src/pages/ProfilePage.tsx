import { useLocation } from "react-router-dom";
import GCProfilePage from "../components/ProfilePage/GroupChatProfile";
import UserProfilePage from "../components/ProfilePage/UserProfile";
import chatBackground from '../ripplebg.png';

export default function ProfilePage() {
    const location = useLocation();
    const { chatId, isGroupChat, userId } = location.state as { chatId: number, isGroupChat: boolean, userId: number };

    return (
        <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            flexGrow: 1,
            overflow: "auto",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${chatBackground})`,
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundColor: "transparent",
        }}>
            {isGroupChat ? (<GCProfilePage chatId={chatId}/>) : (<UserProfilePage userId={userId}/>)}
        </div>
    )
}