import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext from "contexts/VideoContext";
import IconTag from "components/IconTag";
import badge from "assets/images/badge.svg";
import numeral from "numeral";

const VideoInformation = props => {
  const { likeUnlike } = useContext(VideoContext);
  const { player, currentVideo } = useContext(VideoContext).value;
  return (
    <div className="title-container">
      <div className="row-align-center">
        <Button
          className="primary-button big-upvote"
          onClick={() => likeUnlike(currentVideo)}
        >
          <Icon type="caret-up" />
          {numeral(currentVideo && currentVideo.vote_count).format("0,00")}
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
        {player &&
          currentVideo &&
          currentVideo.tags.map(t => {
            return (
              <IconTag
                key={t}
                text={t}
                style={{ fontSize: 14, marginRight: 10 }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default VideoInformation;
