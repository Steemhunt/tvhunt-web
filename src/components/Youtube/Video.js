import React, { useRef, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import _ from "lodash";
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

const Video = props => {
  const playerRef = useRef();

  const { value, updateState, next } = useContext(VideoContext);
  const { videoId } = useContext(SubmitContext);
  const { player, currentVideo } = value;

  useEffect(() => {
    if (window.YT) {
      new window.YT.Player(playerRef.current, {
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
  }, []); //eslint-disable-line

  useEffect(() => {
    player &&
      player.loadVideoById({
        videoId:
          !isMobile().phone && videoId
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
    target.setSize = _.debounce(target.setSize, 100);
    target.setVolume(0);
    updateState({ player: target, volume: 0 });
  }

  function onPlayerStateChange({ data }) {
    const status = PLAYBACK_STATUS[data];
    if (status === STATUS_ENDED) {
      next();
    }
    updateState({ status });
  }

  return <div id="youtube-iframe" ref={playerRef} />;
};

export default withRouter(Video);
