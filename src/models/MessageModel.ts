export interface MessageModel {
    userId: number;
    username: string;
    avatar: string | null;
    message: string;
    isImage: boolean;
    createdAt: string;
    direction: "outgoing" | "incoming";
    position: "first" | "last" | "single";
}