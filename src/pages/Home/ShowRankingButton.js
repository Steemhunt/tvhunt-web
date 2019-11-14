import React, { useContext } from "react";
import { Icon } from "antd";
import VideoContext from "contexts/VideoContext";

const ShowRankingButton = props => {
  const { value, updateState } = useContext(VideoContext);
  const { fullscreen } = value;
  return (
    <div
      className={`small show-ranking ${fullscreen && "visible"}`}
      onClick={() => updateState({ fullscreen: false })}
    >
      <Icon type="menu-fold" />
      <div className="text">Show Ranking</div>
    </div>
  );
};

export default ShowRankingButton;
