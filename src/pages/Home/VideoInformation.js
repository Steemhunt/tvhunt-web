import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext from "contexts/VideoContext";
import IconTag from "components/IconTag";
import badge from "assets/images/badge.svg";

const VideoInformation = props => {
  const { player } = useContext(VideoContext);
  return (
    <div className="title-container">
      <div className="row-align-center">
        <Button className="primary-button big-upvote">
          <Icon type="caret-up"/>
          1,245
        </Button>

        <div className="row-align-center badge small">
          <img src={badge} alt="" />
          <div>
            <div className="secondary">#1 Video</div>
            <div className="text">October 30, 2019</div>
          </div>
        </div>
      </div>

      <div className="title big text-white">
        {player && player.getVideoData().title}
      </div>
      <div className="row-align-center tags">
        <IconTag text="Music" style={{ marginRight: 10 }} />
        <IconTag text="Learn Something" style={{ marginRight: 10 }} />
        <IconTag text="ASMR" />
      </div>
    </div>
  );
};

export default VideoInformation;
