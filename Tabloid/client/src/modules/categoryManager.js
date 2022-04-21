import { getToken } from "./authManager.js";


const _apiUrl = "/api/Category";

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

export const getCategoryById = (id) => {
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
        throw new Error("Unknown error getting category");
      }
    });
  });
};

export const addCategory = (category) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error adding a category");
      }
    })
  );
};



export const editCategory = (category) => {
  return getToken().then((token) => {
    fetch(`${_apiUrl}/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }).then((res) => {
      if (res.ok) {
        return res.status;
      } else {
        throw new Error("Error editing a cateogry");
      }
    });
  });
};