import { getToken } from "./authManager.js";


const _apiUrl= "/api/Category";

export const getAllCategories = () => {
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
            throw new Error("Unknown error getting categories");
        }
    });
});
  };