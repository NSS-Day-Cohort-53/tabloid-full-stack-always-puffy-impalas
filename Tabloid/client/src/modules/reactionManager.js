const reactionUrl = "/api/reaction";


export const addReaction = (reaction) => {
    return fetch(reactionUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reaction)
    })
}