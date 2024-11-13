export interface MessageModel {
    userId: number;
    username: string;
    avatar: string | null;
    message: string;
    createdAt: string;
    direction: "outgoing" | "incoming";
    position: "first" | "last" | "single";
}