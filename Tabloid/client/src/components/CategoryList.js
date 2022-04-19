import React, { useEffect, useState } from "react";
import Category from "./Category";
import { getAllCategories } from "../modules/categoryManager";
import { Link } from "react-router-dom";

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
        <div className="row justify-content-center">
            
          {categories.map((category) => (
            <Category category={category} key={category.id} />
          ))}
        </div>
      </div>
      <Link to="/categories/add" className="category-link">
           Add A New Category
          </Link>
      </div>
   
  );
};

export default CategoryList;
