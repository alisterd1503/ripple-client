export interface ChatModel {
    avatar: string;
    title: string;
    username: string;
    userId: number;
    groupAvatar: string;
    chatId: number;
    isGroupChat: boolean;
    members: string[];
    isOnline?: boolean;
}