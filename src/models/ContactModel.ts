export interface ContactModel {
    chatId: number,
    title: string,
    username: string,
    groupAvatar: string,
    avatar: string,
    isGroupChat: boolean,
    lastMessage: string,
    lastMessageTime: string,
    lastMessageSender: string,
    members: string[],
}