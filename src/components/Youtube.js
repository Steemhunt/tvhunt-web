import React, { useRef, useEffect, useMemo, useContext, useState } from "react";
import { withRouter } from "react-router";
import { Icon, Slider } from "antd";
import fullScreenImg from "assets/images/full-screen.svg";
import volumeImg from "assets/images/volume-light.svg";
import volumeMuteImg from "assets/images/volume-mute-light.svg";
import volumeMuteBlackImg from "assets/images/volume-mute-black.svg";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import TvNoise from "components/TvNoise";
import numeral from "numeral";
import useWindowSize from "hooks/useWindowSize";
import VideoInformation from "pages/Home/VideoInformation";
import isMobile from "ismobilejs";
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
  const [hover, setHover] = useState(false);
  const [noise, showNoise] = useState(true);
  const [noiseFade, setNoiseFade] = useState(false);
  const [slider, setSlider] = useState(0);
  const { width: w, height: h } = useWindowSize();

  const { value, prev, next, likeUnlike, updateState } = useContext(
    VideoContext
  );
  const { videoId } = useContext(SubmitContext);

  const {
    player,
    volume,
    status,
    duration,
    currentTime,
    currentVideo,
    fullscreen,
    liked
  } = value;

  const mobile = isMobile().phone;

  const width = mobile || fullscreen ? w : w - 360;
  const headerHeight = 90;
  const height = mobile
    ? h - headerHeight - 20
    : h - headerHeight - 80;

  useEffect(() => {
    player && player.setSize(width, height);
  }, [width, height]); // eslint-disable-line

  useEffect(() => {
    if (hover) {
      setTimeout(() => setHover(false), 1500);
    }
  }, [hover]); //eslint-disable-line

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
  }, []); //eslint-disable-line

  useEffect(() => {
    ticker && clearInterval(ticker);
    player &&
      player.loadVideoById({
        videoId: videoId
          ? videoId
          : currentVideo
          ? currentVideo.unique_id
          : null
      });
  }, [player, currentVideo, videoId]); //eslint-disable-line

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
    console.log("player ready!");
    target.setSize = _.debounce(target.setSize, 100);
    target.seekTo = _.debounce(target.seekTo, 500);
    target.getDuration = _.debounce(target.getDuration, 100);
    target.setVolume(0);
    // target.playVideo();
    updateState({ player: target, volume: 0 });
  }

  function onPlayerStateChange({ data }) {
    const status = PLAYBACK_STATUS[data];
    console.log("status", status);
    if (status === STATUS_ENDED) {
      console.log("should play next");
    } else if (status === STATUS_PLAYING) {
      setNoiseFade(true);
      setTimeout(() => showNoise(false), 1000);
    } else if (status === STATUS_BUFFERING) {
      showNoise(true);
      setNoiseFade(false);
    } else if (status === STATUS_UNSTARTED) {
      player && player.playVideo();
    }

    updateState({ status });
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

  const Noise = useMemo(() => <TvNoise width={w} height={h} />, [w, h]);

  const alreadyVoted =
    currentVideo && liked && liked.includes(currentVideo.slug);

  return (
    <div
      className={`youtube ${fullscreen && "fullscreen"}`}
      style={{ width, backgroundColor: "#000" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {mobile && (
        <div className="show-ranking-mobile">
          <Icon
            type="menu-unfold"
            onClick={() => updateState({ fullscreen: false })}
          />
        </div>
      )}
      <div id="youtube-iframe" ref={playerRef} />
      <div className={`controls ${mobile && "mobile"}`}>
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
          <div className="row-align-center controls-left">
            <Icon
              type={playIcon}
              className="play-button"
              onClick={playOnClick}
            />
            <Icon
              type="step-forward"
              className="forward-button"
              onClick={next}
            />
            <div className="sound-control">
              <img
                src={volume === 0 ? volumeMuteImg : volumeImg}
                alt=""
                className="sound-button"
                onClick={() => {
                  if (volume === 0) {
                    player && player.unMute();
                    player && player.setVolume(100);
                    updateState({ volume: 100 });
                  } else {
                    updateState({ volume: 0 });
                    player && player.mute();
                    player && player.setVolume(0);
                  }
                }}
              />
              <Slider
                className="volume-slider mobile-hidden"
                value={volume}
                onChange={volume => {
                  updateState({ volume });
                  player && player.setVolume(volume);
                }}
              />
            </div>
            <div className="small">
              {currentTime
                ? numeral(currentTime).format("00:00:00")
                : "00:00:00"}
            </div>
            /
            <div className="small">
              {duration ? numeral(duration).format("00:00:00") : "00:00:00"}
            </div>
          </div>
          <img
            className="fullscreen-img hover-link"
            src={fullScreenImg}
            alt=""
            onClick={() => {
              const iframe = document.getElementById("youtube-iframe");
              var requestFullScreen =
                iframe.requestFullScreen ||
                iframe.mozRequestFullScreen ||
                iframe.webkitRequestFullScreen;
              if (requestFullScreen) {
                requestFullScreen.bind(iframe)();
              }
            }}
          />
        </div>
      </div>

      <div
        className={`hover-controls ${(hover || status !== STATUS_PLAYING) &&
          "paused"}`}
        onClick={playOnClick}
      >
        <div className="row-align-center middle-container">
          <Icon type="step-backward" onClick={prev} />
          <Icon type={playIcon} className="play-icon" onClick={playOnClick} />
          <Icon type="step-forward" onClick={next} />
        </div>
        {!videoId && currentVideo && currentVideo.ranking && (
          <div
            className={`upvote-button ${alreadyVoted && "voted"}`}
            onClick={e => {
              e.stopPropagation();
              likeUnlike({ id: currentVideo.id, slug: currentVideo.slug });
            }}
          >
            {alreadyVoted ? "Unvote this video" : "Upvote this video"}
          </div>
        )}
      </div>

      {noise && (
        <div className={`noise ${noiseFade && "fade-out"}`}>{Noise}</div>
      )}

      {player && player.isMuted() && (
        <div
          className="tap-to-unmute hover-link"
          onClick={() => {
            player.setVolume(100);
            player.unMute();
            updateState({ volume: 100 });
          }}
        >
          <img className="unmute-img" alt="" src={volumeMuteBlackImg} />
          <div>Click To Unmute</div>
        </div>
      )}

      {!videoId && (
        <VideoInformation
          className={!(hover || status === STATUS_PAUSED) && "fade-in-out"}
        />
      )}
    </div>
  );
};

export default withRouter(Youtube);
