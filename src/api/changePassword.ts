const API_URL = 'http://localhost:5002/api/changePassword';

interface NewPassword {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}
interface Response {
    success: boolean;
    message: string;
}

export const changePassword = async (passwords: NewPassword): Promise<Response> => {
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
