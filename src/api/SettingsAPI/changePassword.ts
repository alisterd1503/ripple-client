import { NewPasswordModel } from "../../models/NewPasswordModel";
import { ResponseModel } from "../../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/changePassword`;

export const changePassword = async (passwords: NewPasswordModel): Promise<ResponseModel> => {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(passwords),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error updating password.' };
        }

        return { success: true, message: 'Updated password' };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
};
