import React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

export const Post = ({ post }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">{post.title}</CardTitle>
                <CardSubtitle>{post.userProfile.fullName}</CardSubtitle>
                <CardText>{post.category.name}</CardText>
            </CardBody>
        </Card>
    );
};

export default Post;
