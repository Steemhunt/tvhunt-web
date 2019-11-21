import React, { useState, useContext } from "react";
import { Icon, Button } from "antd";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import onairImg from "assets/images/onair.svg";
import _ from "lodash";

const RankItem = props => {
  const [hover, setHover] = useState(false);
  const { rank, data } = props;
  const { title, vote_count, unique_id, slug } = data;
  const { updateState } = useContext(SubmitContext);
  const { likeUnlike, setCurrentVideo, value } = useContext(VideoContext);
  const { liked, tab, currentVideo } = value;
  const selected =
    currentVideo && currentVideo.slug === data.slug && "selected";

  return (
    <div
      className={`row-align-center rank-item ${selected}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="row-align-center"
        onClick={() => {
          updateState({ videoId: null }, () => {
            setCurrentVideo(tab, data);
          });
        }}
      >
        {selected ? (
          <div className="secondary rank small">
            <img className="" src={onairImg} alt="" />
          </div>
        ) : (
          <>
            {hover ? (
              <div className="secondary rank small">
                <Icon type="caret-right" style={{ fontSize: 24, marginLeft: -8 }} />
              </div>
            ) : (
              <div className="secondary rank small">{rank}</div>
            )}
          </>
        )}
        <div className="row-align-center video-detail">
          <img
            className="rank-item-thumbnail"
            src={`https://img.youtube.com/vi/${unique_id}/hqdefault.jpg`}
            alt=""
          />
          <div className="text small">{_.truncate(title, { length: 60 })}</div>
        </div>
      </div>
      <Button
        className={`primary-button upvote-button ${liked &&
          liked.includes(slug) &&
          "liked"}`}
        onClick={() => likeUnlike(data)}
      >
        <Icon type="caret-up" />
        {vote_count}
      </Button>
    </div>
  );
};

export default withRouter(RankItem);
