import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import VideoInformation from "./VideoInformation";
import Video from "./Video";
import Controls from "./Controls";
import TapToUnmute from "./TapToUnmute";
import HoverControls from "./HoverControls";
import isMobile from "ismobilejs";

const Youtube = props => {
  const { value, updateState } = useContext(VideoContext);
  const { hover } = value;

  useEffect(() => {
    const h =
      isMobile().phone &&
      hover &&
      setTimeout(() => updateState({ hover: false }), 1500);
    return () => h && clearTimeout(h);
  }, [hover]); //eslint-disable-line

  return (
    <div
      className={"youtube-container fullscreen"}
      onMouseEnter={() => updateState({ hover: true })}
      onMouseLeave={() => updateState({ hover: false })}
    >
      <Video />
      <Controls />
      <HoverControls />
      <VideoInformation />
      <TapToUnmute />
    </div>
  );
};

export default withRouter(Youtube);
