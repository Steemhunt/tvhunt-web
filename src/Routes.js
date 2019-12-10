import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";

const Home = asyncComponent(() => import("pages/Home"));
const Newsletter = asyncComponent(() => import("pages/Newsletter"));
const Unsubscribe = asyncComponent(() => import("pages/Newsletter/Unsubscribe"));

const Routes = () => {
  return (
    <div id="content-body" className="content-body">
      <Switch>
        <Route path="/poop-letter/unsubscribe" component={Unsubscribe} />
        <Route path="/poop-letter" component={Newsletter} />
        <Route path="/:topic?/:slug?/:params?" component={Home} />
      </Switch>
    </div>
  );
};

export default withRouter(Routes);
