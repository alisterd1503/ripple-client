interface FormattedMessage {
    userId: number;
    username: string;
    message: string;
    createdAt: string;
    direction: "outgoing" | "incoming";
    position: "first" | "last" | "single";
}
const API_URL = "http://localhost:5002/api/getMessages";

export const getMessages = async (chatId: number): Promise<FormattedMessage[]> => {
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

        const data: FormattedMessage[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};
