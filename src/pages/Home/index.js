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

const Home = props => {
  const {
    loadVideos,
    loadMyUploads,
    loadMyVotes,
    loadVideosByTag,
    updateCurrentVideo,
    infiniteLoad,
    value
  } = useContext(VideoContext);

  const { currentVideo } = value;

  const {
    match: {
      params: { topic, slug, params }
    }
  } = props;

  useEffect(() => {
    scrollTop();
    infiniteLoad(0, 2);

    if (topic === "uploads") loadMyUploads();
    else if (topic === "votes") loadMyVotes();
    else if (topic === "tags") loadVideosByTag(slug, params);
    else if ((topic, slug)) loadVideos(topic, slug);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (topic === "tags") {
      loadVideosByTag(slug);
    } else {
      updateCurrentVideo(topic, slug);
    }
  }, [topic, slug]); //eslint-disable-line

  let metaTitle = "LOL Hunt - Daily top chart for videos";
  let pathname = "";
  let image = `${process.env.REACT_APP_PUBLIC_URL}/og-image-1200.png`;

  if (topic === "uploads") {
    metaTitle = "My Hunts - LOL Hunt";
    pathname = "/uploads";
  } else if (topic === "votes") {
    metaTitle = "My Votes - LOL Hunt";
    pathname = "/votes";
  } else if (topic === "tags" && slug) {
    metaTitle = `Funny videos related to #${slug} - LOL Hunt`;
    pathname = `/tags/${slug}`;
  } else if (topic && !slug) {
    metaTitle = `Funny videos related to #${topic} - LOL Hunt`;
    pathname = `/${topic}`;
  } else if (topic && currentVideo) {
    metaTitle =
      `${currentVideo.title} - LOL Hunt` ||
      "LOL Hunt - Daily top chart for funny Youtube clips";
    pathname = `/${currentVideo.tags[0]}/${currentVideo.slug}`;
    image = `https://img.youtube.com/vi/${currentVideo.unique_id}/hqdefault.jpg`;
  }

  return (
    <div className="home">
      <MetaHelmet title={metaTitle} pathname={pathname} image={image} />
      <div className="row-space-between">
        <Youtube />
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
