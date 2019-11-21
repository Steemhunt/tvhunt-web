import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";
import useWindowSize from "hooks/useWindowSize";

const Header = asyncComponent(() => import("components/Header"));
const Home = asyncComponent(() => import("pages/Home"));
const MobileHome = asyncComponent(() => import("pages/Home/Mobile"));

const Routes = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 640;

  return (
    <div id="content-body" className="content-body">
      <Header />
      <Switch>
        {isMobile ? (
          <>
            <Route path="/:topic?/:slug?" component={MobileHome} />
          </>
        ) : (
          <>
            <Route path="/:topic?/:slug?" component={Home} />
          </>
        )}
      </Switch>
    </div>
  );
};

export default withRouter(Routes);
