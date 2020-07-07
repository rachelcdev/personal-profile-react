import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Login from "../pages/Login/index";
import Signup from "../pages/Signup/index";
export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}
