import React, { useEffect, useState } from "react";
import { Container, Input } from "reactstrap";
import { getAllCategories } from "../modules/categoryManager.js";

export const PostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [header, setHeader] = useState("");
    const [categories, setCategories] = useState([]);
    const [publicationDate, setPublicationDate] = useState("");

    const getCategories = () => {
        getAllCategories().then((cats) => setCategories(cats));
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Container>
            <Input />
        </Container>
    );
};

export default PostForm;
