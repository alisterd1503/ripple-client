import { ContactModel } from "../models/ContactModel";

const API_URL="http://localhost:5002/api/getUserChat"

export const getContacts = async (): Promise<ContactModel[]> => {
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

        const data: ContactModel[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};