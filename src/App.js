import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Button, Navbar, Alignment, Card } from "@blueprintjs/core";
import Login from "./components/Login";
import Register from "./components/Register";
import Question from "./components/Question";
import Response from "./components/Response";
import Dashboard from "./components/Dashboard";
import DisplayResponses from "./components/DisplayResponses";

import "./App.css";

const App = props => {
  const loggedOutTopBar = (
    <>
      <Link to="/login">
        <Button className="bp3-minimal" icon="log-in" text="Login" />
      </Link>
      <Link to="/register">
        <Button className="bp3-minimal" icon="new-person" text="Register" />
      </Link>
    </>
  );
  const loggedInTopBar = (
    <>
      <Link to="/">
        <Button className="bp3-minimal" icon="dashboard" text="Dashboard" />
        <Link to="/question">
          <Button className="bp3-minimal" icon="help" text="Add Question" />
        </Link>
        <Button
          className="bp3-minimal"
          icon="log-out"
          text="Logout"
          onClick={props.store.logout}
        />
      </Link>
    </>
  );

  const loggedOutRoutes = (
    <Switch>
      <Route path="/respond/:id" exact component={Response} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/" exact component={Dashboard} />
      <Redirect to="/" />
    </Switch>
  );
  const loggedInRoutes = (
    <Switch>
      <Route path="/respond/:id" exact component={Response} />
      <Route path="/" exact component={Dashboard} />
      <Route path="/question" exact component={Question} />
      <Route path="/question/:id" exact component={DisplayResponses} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div className="container">
      <div className="header">
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              <Link to="/">Anon</Link>
            </Navbar.Heading>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            {props.store.company ? loggedInTopBar : loggedOutTopBar}
          </Navbar.Group>
        </Navbar>
      </div>
      <div className="content">
        {props.store.company ? loggedInRoutes : loggedOutRoutes}
      </div>
      <div className="footer">
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading> &copy; Nithin, Shiraz, Mohak</Navbar.Heading>
          </Navbar.Group>
        </Navbar>
      </div>
    </div>
  );
};

export default inject("store")(withRouter(observer(App)));
