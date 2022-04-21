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
import { getPostById, deletePost } from "../modules/postManager.js";

export const PostDetails = () => {
    const [post, setPost] = useState({});
    const [showModal, setModal] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const getThePost = () => {
        getPostById(id).then((post) => setPost(post));
    };
    const doDelete = () => {
        deletePost(post.id).then(() => history.push(`/posts`));
    };
    useEffect(() => {
        getThePost();
    }, [id]);
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
            </Card>
        </Container>
    );
};
