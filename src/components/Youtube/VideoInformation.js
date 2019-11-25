import React, { useContext } from "react";
import { Icon } from "antd";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import IconTag from "components/IconTag";
import badge from "assets/images/badge.svg";
import numeral from "numeral";
import moment from "moment";
import isMobile from "ismobilejs";
import { STATUS_PAUSED } from "./Video";
import { displayUsername } from "utils/authHelper";

const VideoInformation = props => {
  const { likeUnlike, value } = useContext(VideoContext);
  const { videoId } = useContext(SubmitContext);
  const { player, status, hover, currentVideo } = value;

  if (videoId) return null;

  return (
    <div
      className={`title-container ${isMobile().phone &&
        "mobile"} fade-in-out ${(hover || status === STATUS_PAUSED) &&
        "hover"}`}
    >
      <div className="row-align-center">
        {currentVideo && (
          <div className="row-align-center badge small">
            <img src={badge} alt="" />
            <div>
              <div className="secondary">Hunted by {displayUsername(currentVideo, 'a guest user')}</div>
              <div className="text">
                {moment(currentVideo.created_at).fromNow()}
              </div>
            </div>
            <div className="divider" />
            <div
              className="hover-link upvote"
              onClick={() => {
                likeUnlike({ id: currentVideo.id, slug: currentVideo.slug });
              }}
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
                url={`${t}/${currentVideo.slug}}`}
                style={{ fontSize: 14, marginRight: 10 }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default VideoInformation;
