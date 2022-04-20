import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getAllCategories } from "../modules/categoryManager.js";
import { getPostById } from "../modules/postManager.js";

export const PostEdit = () => {
    const [post, setPost] = useState({});
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const postCopy = { ...post };

        postCopy[key] = value;
        setPost(postCopy);
    };

    useEffect(() => {
        getPostById(id).then(setPost);
        getAllCategories().then(setCategories);
    }, []);

    return (
        <Container>
            <Form>
                <FormGroup>
                    <Label for="titleInput">Title</Label>
                    <Input
                        required
                        id="title"
                        name="title"
                        type="text"
                        value={post.title}
                        onInput={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="contentInput">Content</Label>
                    <Input
                        required
                        id="content"
                        name="content"
                        type="textarea"
                        value={post.content}
                        onInput={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="headerInput">Header Image URL</Label>
                    <Input
                        id="imageLocation"
                        name="header"
                        type="url"
                        value={post.imageLocation === null ? "" : post.imageLocation}
                        onInput={handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="categoryInput">Category</Label>
                    <Input
                        id="categoryId"
                        required
                        name="category"
                        type="select"
                        value={post.categoryId}
                        onChange={handleInputChange}
                    >
                        <option value="0">Select A Category</option>
                        {categories?.map((cat) => (
                            <option key={`cat--${cat.id}`} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="dateInput">Date</Label>
                    <Input
                        id="publishDateTime"
                        name="date"
                        type="datetime-local"
                        value={post.publishDateTime === null ? "" : post.publishDateTime}
                        onInput={handleInputChange}
                    />
                </FormGroup>
                <Button disabled={!post.title || !post.content || !post.categoryId}>Submit</Button>
            </Form>
        </Container>
    );
};
