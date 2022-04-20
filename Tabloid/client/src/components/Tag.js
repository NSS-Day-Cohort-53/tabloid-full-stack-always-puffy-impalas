import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Tag = ({ tag }) => {
  return (
    <Card>
      <CardBody>

        <p>{tag.name}</p>
      </CardBody>
    </Card>
  );
};

export default Tag;