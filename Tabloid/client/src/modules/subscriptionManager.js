import { getToken } from "./authManager.js";

const _apiUrl = "/api/subscription";

export const checkSubscription = (authorId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}?authorId=${authorId}`, {
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

export const addSubscription = (authorId) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authorId),
        }).then((res) => {
            if (res.ok) {
                return;
            } else {
                throw new Error("Unknown error during subscription process");
            }
        });
    });
};
