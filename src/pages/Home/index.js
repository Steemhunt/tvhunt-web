import React, { useEffect } from "react";
import { scrollTop } from "utils/scroller";
import Youtube from "components/Youtube";
import SideBar from "./SideBar";
import SubmitDrawer from "./SubmitDrawer";
import VideoInformation from "./VideoInformation";
import ShowRankingButton from "./ShowRankingButton";

const Home = props => {
  useEffect(() => {
    scrollTop();
  });


  return (
    <div className="home">
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
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
