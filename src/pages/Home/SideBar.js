import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext, { MODE_TV } from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import RankingList from "./RankingList";
import UploadsAndVotes from "./UploadsAndVotes";
import User from "./User";
import logo from "assets/images/logo-tvh.svg";

const SideBar = props => {
  const videoContext = useContext(VideoContext);
  const submitContext = useContext(SubmitContext);
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
        <img className="logo mobile-portrait-visible" src={logo} alt="logo" />
        <div className="row-align-center hide-ranking mobile-portrait-hidden">
          <User />
        </div>

        <div className="mobile-portrait-hidden">
          <Button
            onClick={() => submitContext.updateState({ showDrawer: true })}
            className="primary-button"
          >
            HUNT VIDEO
          </Button>
        </div>

        <div className="row-align-center mobile-portrait-visible">
          <User />
          <Icon
            className="add-circle"
            type="plus-circle"
            onClick={() => submitContext.updateState({ showDrawer: true })}
          />
        </div>
      </div>

      {mode === MODE_TV ? <RankingList /> : <UploadsAndVotes />}
    </div>
  );
};

export default SideBar;
