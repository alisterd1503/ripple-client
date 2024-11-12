export interface ChatModel {
    title?: string;
    chatId: number;
    added_at: string;
    isGroupChat: boolean;
    participants: {
      userId: number;
      username: string;
      avatar: string;
      bio: string;
    }[];
}