import { getToken } from "./authManager.js";

const _apiUrl = "/api/subscription";

export const checkSubscription = (authorId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/author/${authorId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return true;
            } else {
                return false;
            }
        });
    });
};
