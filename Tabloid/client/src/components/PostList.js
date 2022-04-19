import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getApprovedPosts } from "../modules/postManager.js";
import Post from "./Post.js";

export const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getApprovedPosts().then((posts) => setPosts(posts));
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <Container>
            {posts.map((p) => (
                <Post post={p} key={`post--${p.id}`} />
            ))}
        </Container>
    );
};

export default PostList;
