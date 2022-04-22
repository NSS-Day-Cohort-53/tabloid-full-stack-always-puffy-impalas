import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getPostByCategoryId } from "../modules/postManager.js";
import Post from "./Post.js";

export const PostByCategoryList = () => {
    const {id} = useParams()
    const [posts, setPosts] = useState([]);


    const getCategoryPosts = () => {
        getPostByCategoryId(id).then((posts) => setPosts(posts));
    };

    useEffect(() => {
        getCategoryPosts();
    }, [id]);

    return (
        <Container>
            {posts.map((p) => (
                <Post post={p} key={`categorypost--${p.id}`} />
            ))}
        </Container>
    );
};

export default PostByCategoryList;