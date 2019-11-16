import React, { useEffect, useContext } from "react";
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
    <div className="home">
      <MetaHelmet />
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
