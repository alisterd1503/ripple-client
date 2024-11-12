import { useLocation } from "react-router-dom";
import { ChatModel } from "../models/ChatModel";
import GCProfilePage from "./GCProfilePage";
import UserProfilePage from "./UserProfilePage";

export default function ProfilePage() {
    const location = useLocation();
    const { body } = location.state as { body: ChatModel };

    return (
        <>
            {body.isGroupChat ? (<GCProfilePage body={body}/>) : (<UserProfilePage body={body}/>)}
        </>
    )
}