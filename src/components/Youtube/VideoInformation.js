import React, { useContext } from "react";
import { Icon, Popconfirm, notification } from "antd";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import IconTag from "components/IconTag";
import badge from "assets/images/badge.svg";
import numeral from "numeral";
import moment from "moment";
import isMobile from "ismobilejs";
import { STATUS_PAUSED } from "./Video";
import { displayUsername } from "utils/authHelper";
import youtubeIcon from "assets/images/youtube-brands.svg";
import shareIcon from "assets/images/share-solid.svg";
import flagIcon from "assets/images/flag-solid.svg";
import _ from "lodash";

const VideoInformation = props => {
  const { flagUnflag, likeUnlike, value } = useContext(VideoContext);
  const { videoId } = useContext(SubmitContext);
  const { flagged, player, status, hover, currentVideo } = value;

  if (videoId) return null;

  const alreadyFlagged =
    currentVideo &&
    flagged &&
    _.find(flagged, ["id", currentVideo.id]) !== undefined;

  return (
    <div
      className={`title-container ${isMobile().phone &&
        "mobile"} fade-in-out ${(hover || status === STATUS_PAUSED) &&
        "hover"}`}
    >
      {currentVideo && (
        <>
          <div className="info-container">
            <div className="row-space-between text-white title-share">
              <a
                href={`https://youtube.com/watch?v=${currentVideo.unique_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="title-text hover-link"
              >
                {currentVideo.title}
              </a>
              <div className="row-align-center mobile-portrait-hidden">
                <Popconfirm
                  title={
                    alreadyFlagged
                      ? "Unflag video?"
                      : "Do you think this video does not fit here?"
                  }
                  onConfirm={() => flagUnflag(currentVideo.id)}
                  okText="Yes"
                  placement="bottom"
                >
                  <img
                    src={flagIcon}
                    alt=""
                    className="flag-button hover-link"
                    type="link"
                  />
                </Popconfirm>
                <a
                  href={`https://youtube.com/watch?v=${currentVideo.unique_id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    className="youtube-button hover-link"
                    src={youtubeIcon}
                    alt=""
                  />
                </a>
                <img
                  src={shareIcon}
                  alt=""
                  className="share-button hover-link"
                  type="link"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    notification["success"]({ message: "Copied to clipboard" });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="badge-container">
            <div className="row-align-center badge small">
              <img src={badge} alt="" />
              <div>
                <div className="secondary">
                  Hunted by {displayUsername(currentVideo, "a guest user")}
                </div>
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
        </>
      )}
    </div>
  );
};

export default VideoInformation;
