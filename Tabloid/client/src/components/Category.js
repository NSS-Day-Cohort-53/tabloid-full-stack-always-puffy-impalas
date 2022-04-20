import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  return (
    <Card>
      <CardBody>
        <p>{category.name}</p>
      </CardBody>
    </Card>
  );
};

export default Category;
