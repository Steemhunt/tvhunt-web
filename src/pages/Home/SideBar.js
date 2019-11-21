import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext, { MODE_TV } from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import RankingList from "./RankingList";
import UploadsAndVotes from "./UploadsAndVotes";
import User from "./User";
import logo from "assets/images/logo-tvh.svg";

const SideBar = props => {
  const videoContext = useContext(VideoContext);
  const submitContext = useContext(SubmitContext);
  const { fullscreen, mode } = videoContext.value;

  return (
    <div className={`side-bar ${fullscreen && "fullscreen"}`}>
      <div className="top-header">
        <img className="logo mobile-portrait-visible" src={logo} alt="logo" />
        <div className="row-align-center hide-ranking mobile-portrait-hidden">
          <div
            className="row-align-center"
            onClick={() =>
              videoContext.updateState({ fullscreen: !fullscreen })
            }
          >
            <Icon type="menu-unfold" />
          </div>
          <User />
        </div>

        <div className="mobile-portrait-hidden">
          <Button
            onClick={() => submitContext.updateState({ showDrawer: true })}
            className="primary-button"
          >
            SHARE VIDEO
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
