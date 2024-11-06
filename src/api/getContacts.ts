interface Contact {
    userId: number;
    chatId: number;
    username: string;
}
const API_URL="http://localhost:5002/api/getUserChat"

export const getContacts = async (): Promise<Contact[]> => {
    try {

        const token = localStorage.getItem('token');

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: Contact[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};