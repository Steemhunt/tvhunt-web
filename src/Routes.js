import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";

const Home = asyncComponent(() => import("pages/Home"));

const Routes = () => {
  return (
    <div id="content-body" className="content-body">
      <Switch>
        <Route path="/:topic?/:slug?/:params?" component={Home} />
      </Switch>
    </div>
  );
};

export default withRouter(Routes);
