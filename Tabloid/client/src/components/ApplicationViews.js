import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import { AddReactions } from "./AddReactions";
import PostList from "./PostList.js";

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

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/addReactions">
          <AddReactions />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
