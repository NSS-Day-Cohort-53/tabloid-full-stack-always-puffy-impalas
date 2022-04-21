import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { editTag, getTagById } from "../modules/tagManager";
import { useHistory, useParams } from "react-router-dom";
 

const TagEdit = () => {
  

  const [tag, setTag] = useState({});
  const history = useHistory();
  const {id} = useParams();


  useEffect(() => {
    getTagById(id).then((tag) => setTag(tag));
  }, [id]);

  const handleInputChange = (evt) => {
    const value = evt.target.value;
    const key = evt.target.id;

    const copy = { ...tag };

    copy[key] = value;
    setTag(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    editTag(tag).then(() => {
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
        placeholder={tag.name}
        value={tag.name || ""}
        onChange={handleInputChange}
      />
    </FormGroup>
    <Button disabled={!tag.name} className="btn btn-primary" onClick={handleSave}>
      Submit
    </Button>
    <Button onClick={(e) => history.push(`/tags`)}>Cancel</Button>
  </Form>
  );
};

export default TagEdit;