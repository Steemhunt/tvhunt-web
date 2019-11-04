import React, { useEffect, useState, useContext } from "react";
import { scrollTop } from "utils/scroller";
import Youtube from "components/Youtube";
import useWindowSize from "hooks/useWindowSize";
import SideBar from "./SideBar";
import SubmitDrawer from "./SubmitDrawer";
import VideoInformation from "./VideoInformation";

const Home = props => {
  const { width } = useWindowSize();
  const youtubeWidth = width - 360;
  const youtubeHeight = youtubeWidth * 0.6;

  useEffect(() => {
    scrollTop();
  });

  return (
    <div className="home">
      <div className="row-space-between">
        <div className="content">
          <div className="main-player">
            <Youtube
              width={youtubeWidth}
              height={youtubeHeight}
            />
          </div>
          <VideoInformation />
        </div>
        <SideBar />
        <SubmitDrawer />
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
