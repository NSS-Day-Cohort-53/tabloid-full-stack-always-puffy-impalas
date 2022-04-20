import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../modules/categoryManager";
import { Link } from "react-router-dom";
import { ListGroupItem } from "reactstrap";

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
            <ListGroupItem><Category category={category} key={category.id} />
            <Link to={`/categories/edit/${category.id}`}>Edit</Link>{" "}
            </ListGroupItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
