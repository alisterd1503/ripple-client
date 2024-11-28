import { jwtDecode } from "jwt-decode";

export function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token');
        window.location.href = '/';
    }
}
