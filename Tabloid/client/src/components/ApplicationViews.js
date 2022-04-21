import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { AddReactions } from "./AddReactions";
import CategoryList from "./CategoryList";
import PostList from "./PostList.js";
import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import TagList from "./TagList";
import { PostDetails } from "./PostDetails.js";
import TagForm from "./TagForm";
import PostForm from "./PostForm.js";
import { PostEdit } from "./PostEdit.js";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/posts" exact>
                    {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/posts/add">{isLoggedIn ? <PostForm /> : <Redirect to="/login" />}</Route>

                <Route path="/posts/:id">{isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}</Route>

                <Route path="/posts/edit/:id">{isLoggedIn ? <PostEdit /> : <Redirect to="/login" />}</Route>

                <Route path="/tags" exact>
                    {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/tags/add">{isLoggedIn ? <TagForm /> : <Redirect to="/login" />}</Route>

                <Route path="/categories" exact>
                    {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/categories/add">{isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}</Route>

                <Route path="/categories/edit/:id">
                    {isLoggedIn ? <CategoryEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/reactions/add">{isLoggedIn ? <AddReactions /> : <Redirect to="/login" />}</Route>
            </Switch>
        </main>
    );
}
