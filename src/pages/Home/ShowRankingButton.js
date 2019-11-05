import React, { useContext } from "react";
import {Icon} from 'antd';
import VideoContext from "contexts/VideoContext";

const ShowRankingButton = props => {
  const { fullscreen, updateState } = useContext(VideoContext);
  return (
    <div
      className={`small show-ranking ${fullscreen && "visible"}`}
      onClick={() => updateState({ fullscreen: false })}
    >
      <Icon type="caret-left" />
      <Icon type="caret-right" />
      <div className="text">Show Ranking</div>
    </div>
  );
};

export default ShowRankingButton;
