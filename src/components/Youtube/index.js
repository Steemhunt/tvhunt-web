import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import VideoInformation from "./VideoInformation";
import Video from "./Video";
import Controls from "./Controls";
import TapToUnmute from "./TapToUnmute";
import TvNoise from "./TvNoise";
import HoverControls from "./HoverControls";
import isMobile from "ismobilejs";

export const STATUS_UNSTARTED = "unstarted";
export const STATUS_ENDED = "ended";
export const STATUS_PLAYING = "playing";
export const STATUS_PAUSED = "paused";
export const STATUS_BUFFERING = "buffering";
export const STATUS_CUED = "cued";
export const PLAYBACK_STATUS = {
  "-1": STATUS_UNSTARTED,
  "0": STATUS_ENDED,
  "1": STATUS_PLAYING,
  "2": STATUS_PAUSED,
  "3": STATUS_BUFFERING,
  "5": STATUS_CUED
};

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
      className={"youtube-container"}
      onMouseEnter={() => updateState({ hover: true })}
      onMouseLeave={() => updateState({ hover: false })}
    >
      <Video />
      <Controls />
      <HoverControls />
      <TvNoise />
      <VideoInformation />
      <TapToUnmute />
    </div>
  );
};

export default withRouter(Youtube);
