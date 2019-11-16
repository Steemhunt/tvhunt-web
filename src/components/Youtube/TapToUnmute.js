import React, { useContext } from "react";
import volumeMuteBlackImg from "assets/images/volume-mute-black.svg";
import VideoContext from "contexts/VideoContext";

const TapToUnmute = props => {
  const { value, updateState } = useContext(VideoContext);
  const { player } = value;

  if (player && player.isMuted()) {
    return (
      player.isMuted() && (
        <div
          className="tap-to-unmute hover-link"
          onClick={() => {
            updateState({ volume: 100 });
            player.setVolume(100);
            player.unMute();
          }}
        >
          <img className="unmute-img" alt="" src={volumeMuteBlackImg} />
          <div>Click To Unmute</div>
        </div>
      )
    );
  }
  return null;
};

export default TapToUnmute;
