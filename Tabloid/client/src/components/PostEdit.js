import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getAllCategories } from "../modules/categoryManager.js";
import { getPostById } from "../modules/postManager.js";

export const PostEdit = () => {
    const [post, setPost] = useState({});
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

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
                        id="titleInput"
                        name="title"
                        type="text"
                        value={post.title}
                        onInput={(e) => setPost.title(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="contentInput">Content</Label>
                    <Input
                        required
                        id="contentInput"
                        name="content"
                        type="textarea"
                        value={post.content}
                        onInput={(e) => setPost.content(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="headerInput">Header Image URL</Label>
                    <Input
                        id="headerInput"
                        name="header"
                        type="url"
                        value={post.imageLocation === null ? "" : post.imageLocation}
                        onInput={(e) => setPost.imageLocation(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="categoryInput">Category</Label>
                    <Input
                        id="categoryInput"
                        required
                        name="category"
                        type="select"
                        value={post.categoryId}
                        onChange={(e) => setPost.categoryId(parseInt(e.target.value))}
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
                        id="dateInput"
                        name="date"
                        type="datetime-local"
                        value={post.publishDateTime}
                        onInput={(e) => setPost.publishDateTime(e.target.value)}
                    />
                </FormGroup>
                <Button disabled={!post.title || !post.content || !post.categoryId}>Submit</Button>
            </Form>
        </Container>
    );
};
