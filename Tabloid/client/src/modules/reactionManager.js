import { getToken } from "./authManager";

const reactionUrl = "/api/reaction";


export const addReaction = (reaction) => {
    return getToken().then((token) => {
        return fetch(reactionUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    })
}