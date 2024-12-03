import { AuthModel } from "../../models/AuthModel";
import { ResponseModel } from "../../models/ResponseModel";

const API_URL = `${process.env.REACT_APP_API_URL}/api/loginUser`;
let ws: WebSocket | null = null;
const apiUrl = process.env.REACT_APP_API_URL?.replace(/^http/, 'ws') || ''

export const loginUser = async (login: AuthModel): Promise<ResponseModel> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, message } = data;

            localStorage.setItem('token', token);

            ws = new WebSocket(apiUrl);
            ws.onopen = () => {
                ws?.send(JSON.stringify({ action: 'setOnline', token }));
            };

            ws.onclose = () => {
                console.log('WebSocket closed');
            };

            window.addEventListener('beforeunload', () => {
                if (ws?.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ action: 'setOffline', token }));
                    ws.close();
                }
            });

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