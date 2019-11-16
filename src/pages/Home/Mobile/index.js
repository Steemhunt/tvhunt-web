import React, { useEffect, useContext } from "react";
import VideoContext from "contexts/VideoContext";
import { withRouter } from "react-router";
import SideBar from "pages/Home/SideBar";
import SubmitDrawer from "pages/Home/SubmitDrawer";
import LoginModal from "components/LoginModal";
import MobileYoutube from "./MobileYoutube";
import { scrollTop } from "utils/scroller";

const MobileHome = props => {
  const { loadVideos, updateCurrentVideo } = useContext(VideoContext);
  const {
    match: {
      params: { topic, slug }
    }
  } = props;

  useEffect(() => {
    scrollTop();
    loadVideos(topic, slug);
  }, []); //eslint-disable-line

  useEffect(() => {
    updateCurrentVideo(topic, slug);
  }, [topic, slug]); //eslint-disable-line

  return (
    <div className="mobile-home home">
      <SideBar />
      <MobileYoutube />
      <SubmitDrawer />
      <LoginModal />
    </div>
  );
};

export default withRouter(MobileHome);
