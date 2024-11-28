export interface ContactModel {
    chatId: number,
    title: string,
    username: string,
    userId: number,
    groupAvatar: string,
    avatar: string,
    isGroupChat: boolean,
    lastMessage: string,
    isImage: boolean,
    lastMessageTime: string,
    lastMessageSender: string,
    members: string[],
    isFavourite: boolean,
    unReadMessages: number,
    readLastMessage: boolean,
    isOnline: boolean
}