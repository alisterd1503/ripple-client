import { ProfileModel } from "../models/ProfileModel";

const API_URL="http://localhost:5002/api/getProfile"

export const getProfile = async (): Promise<ProfileModel> => {
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

        const data: ProfileModel = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error ;
    }
};