import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { AddReactions } from "./AddReactions";
import CategoryList from "./CategoryList";
import PostList from "./PostList.js";
import TagList from "./TagList";
import { PostDetails } from "./PostDetails.js";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tags" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/posts/:id">{isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}</Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/reactions/add">
          <AddReactions />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/categories" exact>
          <CategoryList />
        </Route>
      </Switch>
    </main>
  );
};
