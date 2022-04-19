import { useState } from "react";
import "../index.css";
import { addReaction } from "../modules/reactionManager";
import { useHistory } from "react-router-dom";

export const AddReactions = () => {
    const [reaction, setReaction] = useState({ name: null, imageLocation: null })
    const reactionUrl = "/api/reaction";
    const history = useHistory()

    const handlePost = (e) => {
        e.preventDefault();
        if (reaction.name == null || reaction.imageLocation == null) {
            window.alert("Please fill out all input fields");
        }
        else {
            addReaction(reaction).then(() => {
                setReaction({ name: null, imageLocation: null });
                history.go();
            })
        }

    }

    return (
        <>
            <form className="form">
                <h3>Create New Reaction</h3>
                <label>Name of reaction: </label>
                <input onChange={(e) => {
                    const copy = { ...reaction }
                    copy.name = e.target.value
                    setReaction(copy)
                }
                } required />
                <label>Image URL: </label>
                <input onChange={(e) => {
                    const copy = { ...reaction }
                    copy.imageLocation = e.target.value
                    setReaction(copy)
                }
                } required />
            </form>
            <button onClick={handlePost}>Submit</button>

        </>
    )
}