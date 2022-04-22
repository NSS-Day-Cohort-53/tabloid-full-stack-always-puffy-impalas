import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import { getAllTags } from "../modules/tagManager";
import { Link } from "react-router-dom";
import { Button, ListGroupItem } from "reactstrap";

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
            <ListGroupItem key={`link--${tag.id}`}><Tag tag={tag} key={tag.id} />
              <Button><Link to={`/tags/edit/${tag.id}`}>Edit</Link></Button>
              <Button><Link to={`/tags/delete/${tag.id}`}>Delete</Link></Button>
            </ListGroupItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagList;
