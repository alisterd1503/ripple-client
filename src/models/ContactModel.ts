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

interface ProfileModel {
    username: string,
    userId: number,
    bio: string,
    avatar: string,
    added_at: string
}

interface GroupChatModel {
    title: string,
    chatId: number,
    created_at: number
    participants: [{
        userId: number,
        username: string,
        avatar: string,
        bio: string,
    }],
}