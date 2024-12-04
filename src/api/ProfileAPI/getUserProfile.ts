import { UserProfileModel } from "../../models/UserProfileModel";

const API_URL = `${process.env.REACT_APP_API_URL}/api/getUserProfile`;

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

        const data: UserProfileModel = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching profile:', error);
        return [];
    }
};
