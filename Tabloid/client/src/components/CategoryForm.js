import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { addCategory } from "../modules/categoryManager";
import { useHistory } from "react-router-dom";

const CategoryForm = () => {
  

  const [category, setCategory] = useState({ name: null});
  const history = useHistory();

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const categoryCopy = { ...category };

    categoryCopy[key] = value;
    setCategory(categoryCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    addCategory(category).then(() => {
      history.push("/categories");
    });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="category name"
          value={category.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button disabled={!category.name} className="btn btn-primary" onClick={handleSave}>
        Submit
      </Button>
    </Form>
  );
};

export default CategoryForm;
