export interface ContactModel {
    chatId: number,
    title: string,
    description: string,
    groupAvatar: string,
    isGroupChat: boolean,
    lastMessage: string,
    lastSender: number,
    lastMessageTime: string,
    added_at: string,
    participants: [{
        userId: number,
        username: string,
        avatar: string,
        bio: string,
    }],
}