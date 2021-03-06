import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {deleteCategory, getCategoryById } from "../modules/categoryManager";
import { useHistory, useParams } from "react-router-dom";
 

const CategoryDelete = () => {
  

  const [category, setCategory] = useState({});
  const history = useHistory();
  const {id} = useParams();


  useEffect(() => {
    getCategoryById(id).then((category) => setCategory(category));
  }, [id]);


  const handleDelete = (evt) => {
    evt.preventDefault();

    deleteCategory(id).then(() => {
      history.push("/categories");
    });
  };

  return (  
    <div>
    <h2 key={category.id}>Are you sure you want to Delete {category.name} ? </h2>
    <Button disabled={!category.name} className="btn btn-primary" onClick={handleDelete}>
      Delete
    </Button> {" "}
    <Button onClick={(e) => history.push(`/categories`)}>Cancel</Button>
  </div>
  );
};

export default CategoryDelete;
