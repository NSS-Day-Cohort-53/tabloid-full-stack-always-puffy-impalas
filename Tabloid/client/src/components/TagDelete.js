import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {deleteTag, getTagById } from "../modules/tagManager";
import { useHistory, useParams } from "react-router-dom";
 

const TagDelete = () => {
  

  const [tag, setTag] = useState({});
  const history = useHistory();
  const {id} = useParams();


  useEffect(() => {
    getTagById(id).then((tag) => setTag(tag));
  }, [id]);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const copy = { ...tag };

    copy[key] = value;
    setTag(copy);
  };

  const handleDelete = (evt) => {
    evt.preventDefault();

    deleteTag(id).then(() => {
      history.push("/tags");
    });
  };

  return (  
    <div>
    <h2 key={tag.id}>Do you want to delete "{tag.name}"? </h2>
    <Button disabled={!tag.name} className="btn btn-primary" onClick={handleDelete}>
      Delete
    </Button>
    <Button onClick={(e) => history.push(`/tags`)}>Cancel</Button>
  </div>
  );
};

export default TagDelete;
