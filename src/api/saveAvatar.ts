const API_URL = "http://localhost:5002/api/uploadPhoto";

export const uploadPhoto = async (avatar: File): Promise<any> => {
    try {
        const token = localStorage.getItem('token');

        // Use FormData to upload files
        const formData = new FormData();
        formData.append('avatar', avatar);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading photo:', error);
        return null;
    }
};
