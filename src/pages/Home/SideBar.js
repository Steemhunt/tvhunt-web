import React, { useContext } from "react";
import VideoContext, { MODE_TV } from "contexts/VideoContext";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import RankingList from "./RankingList";
import UploadsAndVotes from "./UploadsAndVotes";
import User from "./User";
import logo from "assets/images/logo-tvh.svg";

const SideBar = props => {
  const videoContext = useContext(VideoContext);
  const { infiniteLoad, value } = videoContext;
  const { fullscreen, mode, lastDayLoaded } = value;

  const scrollRef = useBottomScrollListener(
    () => {
      infiniteLoad(lastDayLoaded + 1, 5);
    },
    0, //offset
    500 //debounce
  );

  return (
    <div ref={scrollRef} className={`side-bar ${fullscreen && "fullscreen"}`}>

      <div className="top-header">
        <a href="/">
          <img className="logo mobile-portrait-visible" src={logo} alt="logo" />
        </a>
        <User />
      </div>

      {mode === MODE_TV ? <RankingList /> : <UploadsAndVotes />}
    </div>
  );
};

export default SideBar;
