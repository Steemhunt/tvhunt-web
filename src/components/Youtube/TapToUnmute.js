import React, { useContext } from "react";
import { withRouter } from "react-router";
import volumeMuteBlackImg from "assets/images/volume-mute-black.svg";
import VideoContext from "contexts/VideoContext";

const Youtube = props => {
  const { value, updateState } = useContext(VideoContext);
  const { player } = value;

  return (
    player &&
    player.isMuted() && (
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
    )
  );
};

export default withRouter(Youtube);
