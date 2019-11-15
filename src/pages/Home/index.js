import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { scrollTop } from "utils/scroller";
import Youtube from "components/Youtube";
import SideBar from "./SideBar";
import SubmitDrawer from "./SubmitDrawer";
import ShowRankingButton from "./ShowRankingButton";
import LoginModal from "components/LoginModal";
import MetaHelmet from "components/MetaHelmet";
import isMobile from "ismobilejs";

const Home = props => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="home">
      <MetaHelmet />
      <div className="row-space-between">
        <div
          className="content"
          style={{ paddingTop: isMobile().phone ? 0 : 80 }}
        >
          <div className="main-player">
            <Youtube />
          </div>
        </div>
        <SideBar />
        <SubmitDrawer />
        <ShowRankingButton />
        <LoginModal />
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default withRouter(Home);
