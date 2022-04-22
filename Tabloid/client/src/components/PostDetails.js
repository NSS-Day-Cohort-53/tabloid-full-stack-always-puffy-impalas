import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
    Card,
    CardImg,
    CardText,
    CardTitle,
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { getPostById, deletePost, addReactionToPost, getReactionPostList } from "../modules/postManager.js";
import { getReactions } from "../modules/reactionManager.js";
import "../index.css";
import { Link } from "react-router-dom";
import { addSubscription, checkSubscription } from "../modules/subscriptionManager.js";

export const PostDetails = () => {
    const [post, setPost] = useState({});
    const [showModal, setModal] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [isSubbed, setSubbed] = useState(false);
    const [postReactions, setPostReactions] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const getThePost = () => {
        getPostById(id).then((post) => {
            setPost(post);
            checkSubscription(post.userProfileId).then((result) => {
                setSubbed(result);
            });
        });
    };
    const doDelete = () => {
        deletePost(post.id).then(() => history.push(`/posts`));
    };
    const doSubscribe = () => {
        if (isSubbed) {
            //unsubscribe
            setSubbed(!isSubbed);
        } else {
            //subscribe
            addSubscription({ providerUserProfileId: post.userProfileId });
            setSubbed(!isSubbed);
        }
    };
    useEffect(() => {
        getThePost();
        getReactions().then((data) => {
            setReactions(data);
        });
        getReactionPostList().then((data) => setPostReactions(data));
    }, [id]);

    return (
        <Container>
            <Card>
                <CardImg alt="image" src={post.imageLocation} top width="75%" />
                <CardTitle>{post.title}</CardTitle>
                <CardText>
                    <small className="text-muted">Posted by {post.userProfile?.displayName}. </small>
                    <Link>
                        <small
                            className="text-muted"
                            onClick={() => {
                                doSubscribe();
                            }}
                        >
                            Click to {!isSubbed ? "subscribe" : "unsubscribe"} to {post.userProfile?.displayName}
                        </small>
                    </Link>
                </CardText>
                <CardText>{post.content}</CardText>
                <CardText>
                    <small className="text-muted">{post.publishDateTime}</small>
                </CardText>
                {post.isCurrentUserAuthor && (
                    <>
                        <Button onClick={() => setModal(!showModal)} color="danger">
                            Delete
                        </Button>

                        <Modal isOpen={showModal} toggle={() => setModal(!showModal)}>
                            <ModalHeader toggle={() => setModal(!showModal)}>Delete {post.title}?</ModalHeader>
                            <ModalBody>Are you sure you want to delete this post? This cannot be undone.</ModalBody>
                            <ModalFooter>
                                <Button color="danger" onClick={() => doDelete()}>
                                    Delete
                                </Button>
                                <Button onClick={() => setModal(!showModal)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </>
                )}
                <div className="reactionList">
                    {reactions.map((r) => {
                        return (
                            <button
                                key={r.id}
                                onClick={() => {
                                    const copy = {
                                        postId: post.id,
                                        reactionId: r.id,
                                    };
                                    addReactionToPost(copy).then(() => {
                                        getReactionPostList().then((data) => setPostReactions(data));
                                    });
                                }}
                            >
                                <img src={r.imageLocation} />
                                {
                                    postReactions.filter(
                                        (react) => react.reactionId === r.id && react.postId === post.id
                                    ).length
                                }
                            </button>
                        );
                    })}
                </div>
            </Card>
        </Container>
    );
};
