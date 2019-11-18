import React, { useEffect, useState, useContext } from "react";
import VideoContext from "contexts/VideoContext";
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
  const {
    loadVideos,
    loadMyUploads,
    loadMyVotes,
    updateCurrentVideo,
    value
  } = useContext(VideoContext);

  const { currentVideo } = value;

  const {
    match: {
      params: { topic, slug }
    }
  } = props;

  useEffect(() => {
    scrollTop();
    if (topic === "uploads") loadMyUploads();
    else if (topic === "votes") loadMyVotes();
    else loadVideos(topic, slug);
  }, []); //eslint-disable-line

  useEffect(() => {
    updateCurrentVideo(topic, slug);
  }, [topic, slug]); //eslint-disable-line

  let metaTitle = "";

  if (topic === "uploads") metaTitle = "My Uploads - TV Hunt";
  else if (topic === "votes") metaTitle = "My Votes - TV Hunt";
  else
    metaTitle =
      (currentVideo && `${currentVideo.title} - TV Hunt`) ||
      "TV Hunt - Daily top chart for videos";

  return (
    <div className="home">
      <MetaHelmet title={metaTitle} />
      <div className="row-space-between">
        <div style={{ paddingTop: isMobile().phone ? 0 : 80 }}>
          <Youtube />
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
