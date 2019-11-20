import React, { useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import _ from "lodash";

import { Icon, Button } from "antd";

const RankItem = props => {
  const { rank, data } = props;
  const { title, vote_count, unique_id, slug } = data;
  const { updateState } = useContext(SubmitContext);
  const { likeUnlike, setCurrentVideo, value } = useContext(VideoContext);
  const { liked, tab } = value;

  return (
    <div className="row-align-center rank-item">
      <div
        className="row-align-center"
        onClick={() => {
          updateState({ videoId: null }, () => {
            setCurrentVideo(tab, data);
          });
        }}
      >
        <div className="secondary rank small">{rank}</div>
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
