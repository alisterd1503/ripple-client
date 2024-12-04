import { UserModel } from "./UserModel";

export interface StartGroupChatModel {
    users: UserModel[],
    title: string | null,
    description: string | null,
    avatar: File | null,
}