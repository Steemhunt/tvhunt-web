import React, { useEffect, useContext } from "react";
import VideoContext from "contexts/VideoContext";
import { withRouter } from "react-router";
import SideBar from "pages/Home/SideBar";
import MobileYoutube from "./MobileYoutube";

const MobileHome = props => {
  const { loadVideos, updateCurrentVideo } = useContext(VideoContext);
  const {
    match: {
      params: { topic, slug }
    }
  } = props;

  useEffect(() => {
    loadVideos(topic, slug);
  }, []);

  useEffect(() => {
    // updateCurrentVideo(topic, slug);
  }, [topic, slug]);

  return (
    <div className="home mobile-home">
      <SideBar />
      <MobileYoutube />
    </div>
  );
};

export default withRouter(MobileHome);
