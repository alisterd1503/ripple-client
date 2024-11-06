import { AuthenticateModel } from "../models/authModel";
  
const API_URL = 'http://localhost:5002/api/login';

export const checkLogin = async (login: AuthenticateModel): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, message } = data;
            localStorage.setItem('token', token);
            return { success: true, message };
        } else {
            const errorData = await response.json();
            return { success: false, message: errorData.message };
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
