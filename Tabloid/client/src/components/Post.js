import React from "react";
import { Card } from "reactstrap";

export const Post = ({ post }) => {
    return (
        <Card>
            {post.title} by {post.userProfile.fullName} ({post.category.name})
        </Card>
    );
};

export default Post;
