import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";

const Header = asyncComponent(() => import("components/Header"));
const Home = asyncComponent(() => import("pages/Home"));

const Routes = () => {
  return (
    <div id="content-body" className="content-body">
      <Header />
      <Switch>
        <Route path="/:topic?/:slug?" component={Home} />
      </Switch>
    </div>
  );
};

export default withRouter(Routes);
