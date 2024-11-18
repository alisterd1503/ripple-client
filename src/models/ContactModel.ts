export interface ContactModel {
    chatId: number,
    title: string,
    username: string,
    groupAvatar: string,
    avatar: string,
    isGroupChat: boolean,
    lastMessage: string,
    isImage: boolean,
    lastMessageTime: string,
    lastMessageSender: string,
    members: string[],
}