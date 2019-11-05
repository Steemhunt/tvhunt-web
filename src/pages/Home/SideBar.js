import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import RankingList from "./RankingList";

const SideBar = props => {
  const videoContext = useContext(VideoContext);
  const submitContext = useContext(SubmitContext);
  const { fullscreen } = videoContext;

  return (
    <div className="side-bar">
      <div className="top-header">
        <div
          className="row-align-center hide-ranking"
          onClick={() => videoContext.updateState({ fullscreen: !fullscreen })}
        >
          <Icon type="caret-left"/>
          <Icon type="caret-right"/>
          <div>Hide Ranking</div>
        </div>
        <Button
          onClick={() => submitContext.updateState({ showDrawer: true })}
          className="primary-button"
        >
          HUNT VIDEO
        </Button>
      </div>

      <RankingList />
    </div>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
