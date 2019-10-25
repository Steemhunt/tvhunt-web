import React, { useEffect, useState } from "react";
import { scrollTop } from "utils/scroller";
import IconTag from "components/IconTag";
import Youtube from "components/Youtube";
import useWindowSize from "hooks/useWindowSize";
import donutImg from "assets/images/donut.svg";
import pacmanImg from "assets/images/pacman.svg";
import prevImg from "assets/images/prev.svg";
import nextImg from "assets/images/next.svg";
import SideBar from "./SideBar";

const youtubeIDs = ["FTS5bdW7ykc", "vWUHoAGRTHU", "Yf6rUhPxj70", "iMAKYI4RJsY"];

const Home = props => {
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [idx, setIndex] = useState(0);
  const { width } = useWindowSize();
  const youtubeWidth = width - 360;
  const youtubeHeight = youtubeWidth * 0.6;
  const videoId = youtubeIDs[idx];

  const prev = () => {
    setIndex((idx - 1) % youtubeIDs.length);
  };

  const skip = () => {
    setIndex((idx + 1) % youtubeIDs.length);
  };

  useEffect(() => {
    scrollTop();
  });

  return (
    <div className="home">
      <div className="row-space-between">
        <div className="content">
          <div className="main-player">
            <Youtube
              player={player}
              setPlayer={setPlayer}
              width={youtubeWidth}
              height={youtubeHeight}
              onTick={ct => {
                console.log("tick called");
                setCurrentTime(ct);
              }}
              skip={skip}
              videoId={videoId}
            />
            <div className="prev" onClick={prev}>
              <img src={prevImg} alt="" />
            </div>
            <div className="next" onClick={skip}>
              <img src={nextImg} alt="" />
            </div>
          </div>
          <div className="title-container">
            <div className="title big text-white">
              {player && player.getVideoData().title}
            </div>
            <div className="row-align-center tags">
              <IconTag
                src={pacmanImg}
                text="210.9k"
                style={{ color: "#f7e07e", marginRight: 10 }}
              />
              <IconTag src={donutImg} text="210.9k" />
            </div>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
