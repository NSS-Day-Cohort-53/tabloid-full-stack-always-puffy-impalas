import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { getAllCategories } from "../modules/categoryManager.js";

export const PostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [header, setHeader] = useState("");
    const [categories, setCategories] = useState([]);
    const [chosenCategory, setChosenCategory] = useState(null);
    const [publicationDate, setPublicationDate] = useState("");

    const getCategories = () => {
        getAllCategories().then((cats) => setCategories(cats));
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Container>
            <Form>
                <FormGroup>
                    <Label for="titleInput">Title</Label>
                    <Input id="titleInput" name="title" type="text" onInput={(e) => setTitle(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="contentInput">Content</Label>
                    <Input
                        id="contentInput"
                        name="content"
                        type="textarea"
                        onInput={(e) => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="headerInput">Header Image URL</Label>
                    <Input id="headerInput" name="header" type="url" onInput={(e) => setHeader(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="categoryInput">Category</Label>
                    <Input
                        id="categoryInput"
                        name="category"
                        type="select"
                        onChange={(e) => setChosenCategory(parseInt(e.target.value))}
                    >
                        <option value={null}>Select A Category</option>
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
                        onInput={(e) => setPublicationDate(e.target.value)}
                    />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>
    );
};

export default PostForm;