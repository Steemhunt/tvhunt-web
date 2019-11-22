import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import VideoInformation from "./VideoInformation";
import Video from "./Video";
import TvNoise from "./TvNoise.js";
import Controls from "./Controls";
import TapToUnmute from "./TapToUnmute";
import HoverControls from "./HoverControls";
import isMobile from "ismobilejs";
import Header from "components/Header";

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
      <Header />
      <div className="video-container">
        <Video />
        <TvNoise />
      </div>
      <Controls />
      <HoverControls />
      <VideoInformation />
      <TapToUnmute />
    </div>
  );
};

export default withRouter(Youtube);
