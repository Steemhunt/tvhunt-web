import React, { useContext } from "react";
import { Icon } from "antd";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import { STATUS_BUFFERING, STATUS_PLAYING } from "./Video";

const HoverControls = props => {
  const { value, prev, next, likeUnlike } = useContext(VideoContext);
  const { videoId } = useContext(SubmitContext);

  const { player, status, currentVideo, liked, hover } = value;

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

  const alreadyVoted =
    currentVideo && liked && liked.includes(currentVideo.slug);

  return (
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
  );
};

export default HoverControls;
