import { useState } from "react";
import "../index.css";
import { addReaction } from "../modules/reactionManager";
import { useHistory } from "react-router-dom";

export const AddReactions = () => {
    const [reaction, setReaction] = useState({ name: null, imageLocation: null })
    const history = useHistory()

    const handlePost = (e) => {
        e.preventDefault();

        addReaction(reaction).then(() => {
            setReaction({ name: null, imageLocation: null });
            history.push("/");
        })
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
            <button disabled={!reaction.name || !reaction.imageLocation} onClick={handlePost}>Submit</button>

        </>
    )
}