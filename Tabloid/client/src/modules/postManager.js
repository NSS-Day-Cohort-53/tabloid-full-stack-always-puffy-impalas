import { getToken } from "./authManager.js";

const _apiUrl = "/api/post";

export const getApprovedPosts = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}`, {
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

export const getPostById = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
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

<<<<<<< HEAD
export const addReactionToPost = (postReaction) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/postReaction`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postReaction)
        })
    })
}

export const getReactionPostList = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/postReaction`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
=======
export const addPost = (post) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
>>>>>>> main
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
<<<<<<< HEAD
                throw new Error("Unknown error getting reactionPost list")
            }
        })
    })
}
=======
                throw new Error("Unknown error posting post");
            }
        });
    });
};
>>>>>>> main
