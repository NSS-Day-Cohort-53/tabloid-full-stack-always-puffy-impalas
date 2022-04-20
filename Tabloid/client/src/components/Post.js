import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

export const Post = ({ post }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardSubtitle>{post.userProfile.fullName}</CardSubtitle>
                <CardText>{post.category.name}</CardText>
            </CardBody>
        </Card>
    );
};

export default Post;
