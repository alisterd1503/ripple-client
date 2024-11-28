const API_URL = `${process.env.REACT_APP_API_URL}/api/getChatHeader`;

interface ChatModel {
    avatar: string;
    title: string;
    username: string;
    userId: number;
    groupAvatar: string;
    chatId: number;
    isGroupChat: boolean;
    members: string[];
}

export const getChatHeader = async (chatId: number): Promise<ChatModel> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}?chatId=${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: ChatModel = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};
