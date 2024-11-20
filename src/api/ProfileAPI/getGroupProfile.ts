const API_URL = `${process.env.REACT_APP_API_URL}/api/getGroupProfile`;

interface GroupProfile {
    title: string;
    description: string;
    groupAvatar: string;
    created_at: string;
    added_at: string;
    is_favourite: boolean;
    members: {
      userId: number;
      username: string;
      avatar: string;
      bio: string;
    }[];
}

export const getGroupProfile = async (chatId: number): Promise<any> => {
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

        const data: GroupProfile = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return [];
    }
};
