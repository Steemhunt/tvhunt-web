import React, { useRef, useEffect, useState } from "react";
import { Icon, Slider } from "antd";
import PropTypes from "prop-types";
import numeral from "numeral";
import _ from "lodash";

export const STATUS_UNSTARTED = "unstarted";
export const STATUS_ENDED = "ended";
export const STATUS_PLAYING = "playing";
export const STATUS_PAUSED = "paused";
export const STATUS_BUFFERING = "buffering";
export const STATUS_CUED = "cued";

const PLAYBACK_STATUS = {
  "-1": STATUS_UNSTARTED,
  "0": STATUS_ENDED,
  "1": STATUS_PLAYING,
  "2": STATUS_PAUSED,
  "3": STATUS_BUFFERING,
  "5": STATUS_CUED
};

const Youtube = props => {
  const playerRef = useRef();
  const [player, setPlayer] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [status, setStatus] = useState(STATUS_UNSTARTED);

  const { width, height, videoId, onTick } = props;

  useEffect(() => {
    new window.YT.Player(playerRef.current, {
      height,
      width,
      videoId,
      playerVars: { autoplay: 0, controls: 0 },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  });

  useEffect(() => {
    let tick = () => {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      setCurrentTime(currentTime);
      setDuration(duration);
      onTick(currentTime);
    };

    let ticker = null;

    if (status === STATUS_PLAYING) {
      tick();
      ticker = setInterval(tick, 1000);
    }

    player && onTick(player.getCurrentTime());

    return () => ticker && clearInterval(ticker);
  }, [status]); //eslint-disable-line

  function onPlayerReady({ target }) {
    target.setSize = _.debounce(target.setSize, 100);
    target.seekTo = _.debounce(target.seekTo, 500);
    target.getDuration = _.debounce(target.getDuration, 100);
    setCurrentTime(target.getCurrentTime());
    setPlayer(target);
    props.setPlayer(target);
  }

  function onPlayerStateChange({ data }) {
    console.log(PLAYBACK_STATUS[data]);
    setStatus(PLAYBACK_STATUS[data]);
  }

  useEffect(() => {
    if (player) {
      player.setSize(width, height);
    }
  }, [width, height, player]);

  let playIcon = null;
  let playOnClick = null;
  if (status === STATUS_BUFFERING) {
    playIcon = "loading";
  } else if (status === STATUS_PLAYING) {
    playIcon = "pause";
    playOnClick = () => player.pauseVideo();
  } else {
    playIcon = "caret-right";
    playOnClick = () => player.playVideo();
  }

  return (
    <div className="youtube" style={{ width, backgroundColor: "#000" }}>
      <div ref={playerRef} />
      <div className="slider-container">
        <Icon className="play-button" type={playIcon} onClick={playOnClick} />
        <div>
          {currentTime ? numeral(currentTime).format("00:00:00") : "00:00:00"}
        </div>
        <Slider
          className="slider"
          tipFormatter={value => {
            if (player) {
              const duration = player.getDuration();
              return numeral(duration * (value / 100)).format("00:00:00");
            }
          }}
          onChange={value => {
            const duration = player.getDuration();
            player.seekTo(duration * (value / 100));
          }}
          onAfterChange={value => {
            const duration = player.getDuration();
            const currentTime = duration * (value / 100);
            setCurrentTime(currentTime);
            onTick(currentTime);
          }}
        />
        <div>
          {duration ? numeral(duration).format("00:00:00") : "00:00:00"}
        </div>
      </div>
    </div>
  );
};

Youtube.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  videoId: PropTypes.string,
  onTick: PropTypes.func
};

Youtube.defaultProps = {
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  height:
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight,
  videoId: "FTS5bdW7ykc",
  onTick: () => {}
};

export default Youtube;
