import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import VideoInformation from "./VideoInformation";
import Video from "./Video";
import TvNoise from "./TvNoise.js";
import Controls from "./Controls";
import TapToUnmute from "./TapToUnmute";
import HoverControls from "./HoverControls";
import Header from "components/Header";

const Youtube = props => {
  const { value, updateState } = useContext(VideoContext);
  const { hover, fullscreen } = value;

  useEffect(() => {
    const h = hover && setTimeout(() => updateState({ hover: false }), 5000);
    return () => h && clearTimeout(h);
  }, [hover]); //eslint-disable-line

  return (
    <div
      className={`youtube-container no-select ${fullscreen && "fullscreen"}`}
      onMouseMove={() => updateState({ hover: true })}
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
