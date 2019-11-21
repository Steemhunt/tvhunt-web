import React, { useEffect, useContext } from "react";
import { Icon } from "antd";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import VideoInformation from "./VideoInformation";
import Video from "./Video";
import TvNoise from "./TvNoise.js";
import Controls from "./Controls";
import TapToUnmute from "./TapToUnmute";
import HoverControls from "./HoverControls";
import isMobile from "ismobilejs";

const Youtube = props => {
  const { value, updateState } = useContext(VideoContext);
  const { hover, fullscreen, currentVideo } = value;

  useEffect(() => {
    const h =
      isMobile().phone &&
      hover &&
      setTimeout(() => updateState({ hover: false }), 1500);
    return () => h && clearTimeout(h);
  }, [hover]); //eslint-disable-line

  return (
    <div
      className={`youtube-container no-select ${(fullscreen || currentVideo) &&
        "fullscreen"}`}
      onMouseEnter={() => updateState({ hover: true })}
      onMouseLeave={() => updateState({ hover: false })}
    >
      <div className="mobile-youtube-header">
        <Icon
          className="secondary"
          onClick={() => updateState({ currentVideo: null })}
          type="menu-unfold"
        />
      </div>

      <div className="video-container">
        <Video />
        <TvNoise width={100} height={100} />
      </div>
      <Controls />
      <HoverControls />
      <VideoInformation />
      <TapToUnmute />
    </div>
  );
};

export default withRouter(Youtube);
