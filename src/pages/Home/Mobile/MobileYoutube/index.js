import React, { useContext } from "react";
import VideoContext from "contexts/VideoContext";
import { withRouter } from "react-router";
import { Icon } from "antd";
import Youtube from "components/Youtube";

const MobileYoutube = props => {
  const { value, updateState } = useContext(VideoContext);
  const { currentVideo } = value;
  return (
    <div className={`mobile-youtube-container ${currentVideo && "fullscreen"}`}>
      <div className="mobile-youtube-header">
        <Icon
          onClick={() => updateState({ currentVideo: null })}
          type="menu-unfold"
        />
      </div>
      <Youtube />
    </div>
  );
};

export default withRouter(MobileYoutube);
