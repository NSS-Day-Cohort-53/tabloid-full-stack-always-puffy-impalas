import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { getAllTags } from "../modules/tagManager";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";

export const TagList = () => {
  const [tags, setTags] = useState([]);
  

  const getTags = () => {
    getAllTags().then((tags) => setTags(tags));
  };


  useEffect(() => {
    getTags();
  }, []);


  return (
    <div>
      <Link to="/tags/add" className="tag-link">
        Add A New Tag
      </Link>
      <div className="container">
        <div className="row justify-content-center">
          {tags.map((tag) => (
            <ListGroupItem><Tag tag={tag} key={tag.id} />
            <Link to={`/tags/edit/${tag.id}`}>Edit</Link>
            </ListGroupItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagList;
