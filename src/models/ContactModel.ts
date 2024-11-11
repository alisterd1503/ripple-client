export interface ContactModel {
    chatId: number,
    title: string,
    isGroupChat: boolean,
    lastMessage: string,
    lastMessageTime: string,
    added_at: string,
    participants: [{
        userId: number,
        username: string,
        avatar: string,
        bio: string,
    }],
}