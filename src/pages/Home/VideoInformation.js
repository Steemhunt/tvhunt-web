import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext from "contexts/VideoContext";
import IconTag from "components/IconTag";
import badge from "assets/images/badge.svg";
import numeral from "numeral";
import moment from "moment";

const VideoInformation = props => {
  const { likeUnlike } = useContext(VideoContext);
  const { player, currentVideo } = useContext(VideoContext).value;

  return (
    <div className="title-container">
      <div className="row-align-center">
        {currentVideo && currentVideo.ranking && (
          <div className="row-align-center badge small">
            <img src={badge} alt="" />
            <div>
              <div className="secondary">#{currentVideo.ranking} Video</div>
              <div className="text">
                {moment(currentVideo.created_at).format("MMMM DD, YYYY")}
              </div>
            </div>
            <div className="divider" />
            <div
              className="hover-link upvote"
              onClick={() => likeUnlike(currentVideo.id)}
            >
              <Icon type="caret-up" />
              <div>{numeral(currentVideo.vote_count).format("0,0")}</div>
            </div>
          </div>
        )}
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
