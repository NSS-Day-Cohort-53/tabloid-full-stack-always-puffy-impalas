import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardImg, CardText, CardTitle, Container, Button } from "reactstrap";
import { getUser } from "../modules/authManager.js";
import { getPostById } from "../modules/postManager.js";

export const PostDetails = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const getThePost = () => {
        getPostById(id).then((post) => setPost(post));
    };
    useEffect(() => {
        getThePost();
    }, []);
    return (
        <Container>
            <Card>
                <CardImg alt="image" src={post.imageLocation} top width="75%" />
                <CardTitle>{post.title}</CardTitle>
                <CardText>
                    <small className="text-muted">{post.userProfile?.displayName}</small>
                </CardText>
                <CardText>{post.content}</CardText>
                <CardText>
                    <small className="text-muted">{post.publishDateTime}</small>
                </CardText>
                {post.isCurrentUserAuthor && <Button color="danger">Delete</Button>}
            </Card>
        </Container>
    );
};
