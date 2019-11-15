import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import asyncComponent from "asyncComponent";
import isMobile from "ismobilejs";

const Header = asyncComponent(() => import("components/Header"));
const Home = asyncComponent(() => import("pages/Home"));
const MobileHome = asyncComponent(() => import("pages/Home/SideBar"));
const MobileYoutube = asyncComponent(() => import("pages/MobileYoutube"));

class Routes extends Component {
  render() {
    return (
      <div id="content-body" className="content-body">
        <Header />
        <Switch>
          {isMobile().phone ? (
            <>
              <Route path="/" exact component={MobileHome} />
              <Route path="/:topic/:slug" exact component={MobileYoutube} />
            </>
          ) : (
            <>
              <Route path="/" exact component={Home} />
              <Route path="/:topic/:slug" exact component={Home} />
            </>
          )}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
