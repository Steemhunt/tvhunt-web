import React, { useRef, useEffect, useMemo, useContext, useState } from "react";
import { Icon, Slider } from "antd";
import VideoContext from "contexts/VideoContext";
import TvNoise from "components/TvNoise";
import PropTypes from "prop-types";
import numeral from "numeral";
import useWindowSize from "hooks/useWindowSize";
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

const Youtube = props => {
  const playerRef = useRef();
  const [ticker, setTicker] = useState(null);
  const [noise, showNoise] = useState(true);
  const [slider, setSlider] = useState(0);
  const { width: w } = useWindowSize();

  const {
    player,
    prev,
    next,
    playlist,
    volume,
    currentIndex,
    updateState,
    status,
    duration,
    currentTime,
    fullscreen
  } = useContext(VideoContext);
  const videoId = playlist[currentIndex];

  const width = fullscreen ? w : w - 360;
  const height = width * 0.5;

  useEffect(() => {
    if (player) {
      showNoise(true);
      updateState({
        status: PLAYBACK_STATUS["-1"],
        duration: null,
        player: null
      });
      ticker && clearInterval(ticker);
      player.destroy();
    }
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
  }, [videoId]); //eslint-disable-line

  useEffect(() => {
    let tick = () => {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      setSlider((currentTime / duration) * 100);
      updateState({ currentTime, duration });
    };

    if (status === STATUS_PLAYING) {
      tick();
      setTicker(setInterval(tick, 1000));
    } else {
      ticker && clearInterval(ticker);
    }

    player && updateState({ currentTime: player.getCurrentTime() });

    return () => ticker && clearInterval(ticker);
  }, [status]); //eslint-disable-line

  function onPlayerReady({ target }) {
    target.setSize = _.debounce(target.setSize, 100);
    target.seekTo = _.debounce(target.seekTo, 500);
    target.getDuration = _.debounce(target.getDuration, 100);
    updateState({ player: target, volume: target.getVolume() });

    setTimeout(() => showNoise(false), 1000);
  }

  function onPlayerStateChange({ data }) {
    console.log(PLAYBACK_STATUS[data]);
    updateState({ status: PLAYBACK_STATUS[data] });
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

  const Noise = useMemo(() => <TvNoise width={width} height={height} />, [
    width,
    height
  ]);

  return (
    <div className="youtube" style={{ width, backgroundColor: "#000" }}>
      <div ref={playerRef} />
      <div className="controls">
        <Slider
          className="slider"
          value={slider}
          tipFormatter={value => {
            if (player) {
              const duration = player.getDuration();
              return numeral(duration * (value / 100)).format("00:00:00");
            }
          }}
          onChange={value => {
            setSlider(value);
          }}
          onAfterChange={value => {
            const duration = player.getDuration();
            const currentTime = duration * (value / 100);
            player.seekTo(duration * (value / 100));
            clearInterval(ticker);
            updateState({ currentTime });
          }}
        />
        <div className="slider-container">
          <Icon type={playIcon} className="play-button" onClick={playOnClick} />
          <Icon type="step-forward" className="forward-button" onClick={next} />
          <div className="sound-control">
            <Icon
              type="sound"
              className="sound-button"
              onClick={() => {
                if (volume === 0) {
                  player && player.setVolume(100);
                  updateState({ volume: 100 });
                } else {
                  updateState({ volume: 0 });
                  player && player.setVolume(0);
                }
              }}
            />
            <Slider
              className="volume-slider"
              value={volume}
              onChange={volume => {
                updateState({ volume });
                player && player.setVolume(volume);
              }}
            />
          </div>
          <div className="small">
            {currentTime ? numeral(currentTime).format("00:00:00") : "00:00:00"}
          </div>
          /
          <div className="small">
            {duration ? numeral(duration).format("00:00:00") : "00:00:00"}
          </div>
        </div>
      </div>

      <div className="hover-controls" onClick={playOnClick}>
        <Icon type="step-backward" onClick={prev} />
        <Icon type={playIcon} className="play-icon" onClick={playOnClick} />
        <Icon type="step-forward" onClick={next} />
      </div>

      {noise && <div className={`noise ${player && "fade-out"}`}>{Noise}</div>}
    </div>
  );
};

Youtube.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Youtube.defaultProps = {
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  height:
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
};

export default Youtube;
