import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { scrollTop } from "utils/scroller";
import Youtube from "components/Youtube";
import SideBar from "./SideBar";
import SubmitDrawer from "./SubmitDrawer";
import VideoInformation from "./VideoInformation";
import ShowRankingButton from "./ShowRankingButton";
import OnboardingModal from "components/OnboardingModal";
import MetaHelmet from "components/MetaHelmet";

const Home = props => {
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <div className="home">
      <MetaHelmet />
      <div className="row-space-between">
        <div className="content">
          <div className="main-player">
            <Youtube />
          </div>
          <VideoInformation />
        </div>
        <SideBar />
        <SubmitDrawer />
        <ShowRankingButton />
        <OnboardingModal />
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default withRouter(Home);
