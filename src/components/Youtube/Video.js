import React, { useRef, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import useWindowSize from "hooks/useWindowSize";
import isMobile from "ismobilejs";
import TvNoise from "./TvNoise.js";
import _ from "lodash";

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

const Video = props => {
  const playerRef = useRef();
  const { width: w, height: h } = useWindowSize();

  const { value, updateState, destroyPlayer } = useContext(VideoContext);
  const { videoId } = useContext(SubmitContext);
  const { player, status, currentVideo, fullscreen } = value;

  const mobile = isMobile().phone;
  const headerHeight = 90;
  const width = mobile ? w : fullscreen ? w : w - 360;
  const height = mobile ? h - headerHeight - 20 : h - headerHeight - 80;

  useEffect(() => {
    if (window.YT) {
      new window.YT.Player(playerRef.current, {
        height,
        width,
        playerVars: {
          autoplay: 1,
          controls: 0,
          playsinline: 1,
          autohide: 0,
          muted: 1,
          mute: 1,
          widget_referrer: process.env.REACT_APP_PUBLIC_URL
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }

    return () => destroyPlayer();
  }, []); //eslint-disable-line

  useEffect(() => {
    player &&
      player.loadVideoById({
        videoId: videoId
          ? videoId
          : currentVideo
          ? currentVideo.unique_id
          : null
      });
  }, [player, currentVideo, videoId]); //eslint-disable-line

  function onPlayerReady({ target }) {
    console.log("player ready!");
    target.setSize = _.debounce(target.setSize, 100);
    target.seekTo = _.debounce(target.seekTo, 500);
    target.getDuration = _.debounce(target.getDuration, 100);
    target.setVolume(0);
    updateState({ player: target, volume: 0 });
  }

  function onPlayerStateChange({ data }) {
    const status = PLAYBACK_STATUS[data];
    updateState({ status });
  }

  useEffect(() => {
    if (player) {
      player.setSize(width, height);
    }
  }, [width, height, player]);

  return (
    <>
      <div id="youtube-iframe" ref={playerRef} />
      <div
        className={`noise-container ${status !== STATUS_BUFFERING &&
          "fade-out"}`}
      >
        <TvNoise width={w} height={h} />
      </div>
    </>
  );
};

export default withRouter(Video);
