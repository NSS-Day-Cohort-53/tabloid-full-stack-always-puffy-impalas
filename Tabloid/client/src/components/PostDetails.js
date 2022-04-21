import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardImg, CardText, CardTitle, Container } from "reactstrap";
import { addReactionToPost, getPostById, getReactionPostList } from "../modules/postManager.js";
import { getReactions } from "../modules/reactionManager.js";
import "../index.css";

export const PostDetails = () => {
    const [post, setPost] = useState({});
    const [reactions, setReactions] = useState([])
    const [postReactions, setPostReactions] = useState([])
    const { id } = useParams();
    const getThePost = () => {
        getPostById(id).then((post) => setPost(post));
    };

    useEffect(() => {
        getThePost();
        getReactions().then((data) => {
            setReactions(data)
        });
        getReactionPostList().then((data) => setPostReactions(data))
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
                <div className="reactionList">
                    {reactions.map((r) => {
                        return <button key={r.id} onClick={() => {
                            const copy = {
                                postId: post.id,
                                reactionId: r.id
                            }
                            addReactionToPost(copy).then(() => {
                                getReactionPostList().then(data => setPostReactions(data))
                            })
                        }}><img src={r.imageLocation} />{postReactions.filter(react => react.reactionId === r.id && react.postId === post.id).length}</button>
                    })}
                </div>
            </Card>
        </Container>
    );
};
