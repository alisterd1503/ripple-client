import { AuthModel } from "../../models/AuthModel";
import { ResponseModel } from "../../models/ResponseModel";
const API_URL = `${process.env.REACT_APP_API_URL}/api/register`;

export const registerUser = async (registration: AuthModel): Promise<ResponseModel> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registration)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, message: errorData.message || 'Error registering user.' };
        }

        return { success: true, message: 'Registration successful!' };
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'Network error or server unavailable.' };
    }
};
