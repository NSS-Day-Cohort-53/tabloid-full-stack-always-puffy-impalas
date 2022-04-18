import React, { useEffect, useState } from "react";
import { getApprovedPosts } from "../modules/postManager.js";

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getApprovedPosts().then((posts) => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return <div></div>;
};

export default PostList;
