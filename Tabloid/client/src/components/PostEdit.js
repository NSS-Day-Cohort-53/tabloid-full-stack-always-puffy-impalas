import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form } from "reactstrap";

export const PostEdit = () => {
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(() => {}, []);

    return (
        <Container>
            <Form></Form>
        </Container>
    );
};
