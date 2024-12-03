const API_URL = `${process.env.REACT_APP_API_URL}/api/logoutUser`;
let ws: WebSocket | null = null; // Assuming this is shared across the app

export const logoutUser = async (): Promise<void> => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Clear local storage and redirect if no token
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
    }

    try {
        // Notify server via API
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            console.error('Token expired or invalid');
        } else {
            console.error('Error logging out user');
        }

        // Notify WebSocket server
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ action: 'setOffline', token }));
            ws.close(); // Cleanly close the WebSocket connection
        }
    } catch (err) {
        console.error('Network error while logging out:', err);
    } finally {
        // Clear token and redirect
        localStorage.removeItem('token');
        ws = null; // Reset WebSocket reference
        window.location.href = '/';
    }
};
