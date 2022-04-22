import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../modules/categoryManager";
import { Link } from "react-router-dom";
import { ListGroupItem, Button } from "reactstrap";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((categories) => setCategories(categories));
  };

  
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="container">
      <Link to="/categories/add" className="category-link">
        Add A New Category
      </Link>
      </div>
      <div className="container">
        <div className=" mt-4 row justify-content-center">
          {categories.map((category) => (
            <ListGroupItem key={`link--${category.id}`}><Link to={`/posts/category/${category.id}`}><Category category={category} key={category.id} /></Link>
            <Button outline color="primary"><Link to={`/categories/edit/${category.id}`}>Edit</Link></Button>{" "}
            <Button outline color="danger"><Link to={`/categories/delete/${category.id}`}>Delete</Link></Button>
            </ListGroupItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
