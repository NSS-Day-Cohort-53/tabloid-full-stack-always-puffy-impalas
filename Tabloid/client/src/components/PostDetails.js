import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../modules/postManager.js";

export const PostDetails = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const getThePost = () => {
        getPostById(id).then((post) => setPost(post));
    };
    useEffect(() => {
        getThePost();
    }, [id]);
    return <div></div>;
};
