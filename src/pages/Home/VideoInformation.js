import React, {useContext} from "react";
import VideoContext from 'contexts/VideoContext';
import IconTag from "components/IconTag";
import donutImg from "assets/images/donut.svg";
import pacmanImg from "assets/images/pacman.svg";

const VideoInformation = props => {
  const {player} = useContext(VideoContext);
  return (
    <div className="title-container">
      <div className="title big text-white">
        {player && player.getVideoData().title}
      </div>
      <div className="row-align-center tags">
        <IconTag
          src={pacmanImg}
          text="210.9k"
          style={{ color: "#f7e07e", marginRight: 10 }}
        />
        <IconTag src={donutImg} text="210.9k" />
      </div>
    </div>
  );
};

export default VideoInformation;
