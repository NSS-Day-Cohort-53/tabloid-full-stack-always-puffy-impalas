import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { editCategory, getCategoryById } from "../modules/categoryManager";
import { useHistory, useParams } from "react-router-dom";
 

const CategoryEditForm = () => {
  

  const [category, setCategory] = useState({});
  const history = useHistory();
  const {id} = useParams();


  useEffect(() => {
    getCategoryById(id).then((category) => setCategory(category));
  }, []);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const categoryCopy = { ...category };

    categoryCopy[key] = value;
    setCategory(categoryCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    editCategory(category).then(() => {
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
        placeholder={category.name}
        value={category.name}
        onChange={handleInputChange}
      />
    </FormGroup>
    <Button disabled={!category.name} className="btn btn-primary" onClick={handleSave}>
      Submit
    </Button> {" "}
    <Button onClick={(e) => history.push(`/posts`)}>Cancel</Button>
  </Form>
  );
};

export default CategoryEditForm;
