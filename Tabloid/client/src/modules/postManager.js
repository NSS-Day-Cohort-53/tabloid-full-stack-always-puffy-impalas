import { getToken } from "./authManager.js";

const _apiUrl = "/api/userprofile";

export const getApprovedPosts = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/posts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Unknown error getting posts");
            }
        });
    });
};
