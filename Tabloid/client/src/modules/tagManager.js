import { getToken } from "./authManager.js";

const _apiUrl = "/api/tag";

export const getAllTags = () => {
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
                throw new Error("Unknown Error Getting Tags");
            }
        });
    });
};

export const getTagById = (id) => {
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
          throw new Error("Unknown Error Getting Tag");
        }
      });
    });
  };

export const createTag = (tag) => {
    return getToken().then((token) =>
      fetch(_apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    }).then((resp) => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error("Unknown Error Creating Tag");
        }
    })
)};

export const editTag = (tag) => {
    return getToken().then((token) => {
      fetch(`${_apiUrl}/${tag.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((resp) => {
        if (resp.ok) {
          return resp.status
        } else {
          throw new Error("Error Editing a Tag");
        }
      });
    });
  };

  export const deleteTag = (id) => {
    return getToken().then((token) =>
      fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          return
        } else {
          throw new Error("Error Deleting a Tag");
        }
      })
    );
  };