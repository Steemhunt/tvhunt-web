import React, { useContext } from "react";
import { withRouter } from "react-router";
import VideoContext from "contexts/VideoContext";
import AuthContext from "contexts/AuthContext";
import { Icon, Button } from "antd";

const RankItem = props => {
  const { rank, data } = props;
  const { title, vote_count, unique_id, slug } = data;
  const { likeUnlike, updateState, value } = useContext(VideoContext);
  const { liked, tab } = value;


  return (
    <div className="row-align-center rank-item">
      <div
        className="row-align-center"
        onClick={() => {
          props.history.push(`/${tab}/${slug}`);
          updateState({ currentVideo: data });
        }}
      >
        <div className="secondary rank small">{rank}</div>
        <div className="row-align-center video-detail">
          <img
            className="rank-item-thumbnail"
            src={`https://img.youtube.com/vi/${unique_id}/hqdefault.jpg`}
            alt=""
        />
          <div className="text small">{title}</div>
        </div>
      </div>
      <Button
        className={`primary-button upvote-button ${liked && liked.includes(slug) &&
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
