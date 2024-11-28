const API_URL = `${process.env.REACT_APP_API_URL}/api/getUserProfile`;

interface UserProfile {
    userId: number;
    username: string;
    avatar: string;
    bio: string;
    added_at: string | null;
    is_favourite: boolean;
    is_online: boolean;
    groups_in: {
        chatId: number;
        title: string;
        groupAvatar: string;
        members: string[]
    }[];
}

export const getUserProfile = async (userId: number): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data: UserProfile = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching profile:', error);
        return [];
    }
};
