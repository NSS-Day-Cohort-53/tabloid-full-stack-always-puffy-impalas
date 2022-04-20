import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { createTag } from "../modules/tagManager";
import { useHistory } from "react-router-dom";

const TagForm = () => {


  const [tag, setTag] = useState({ name: null});
  const history = useHistory();

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const tagCopy = { ...tag };

    tagCopy[key] = value;
    setTag(tagCopy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    createTag(tag).then(() => {
      history.push("/tags");
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
          placeholder="Tag Name"
          value={tag.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button disabled={!tag.name} className="btn btn-primary" onClick={handleSave}>
        Submit
      </Button>
    </Form>
  );
};

export default TagForm;