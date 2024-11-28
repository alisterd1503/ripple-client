const API_URL = `${process.env.REACT_APP_API_URL}/api/logoutUser`;

export const logoutUser = async (): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) {
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log('User logged out successfully');
        } else if (response.status === 401) {
            console.error('Token expired or invalid');
        } else {
            console.error('Error logging out user');
        }
    } catch (err) {
        console.error('Network error while logging out:', err);
    } finally {
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}
