import React, { useContext } from "react";
import VideoContext from "contexts/VideoContext";
import { Icon, Button } from "antd";

const RankItem = props => {
  const { rank, data } = props;
  const { title, vote_count, unique_id } = data;
  const { updateState } = useContext(VideoContext);

  return (
    <div
      className="row-align-center rank-item"
      onClick={() => updateState({ currentVideo: data })}
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
      <Button className="primary-button upvote-button">
        <Icon type="caret-up" />
        {vote_count}
      </Button>
    </div>
  );
};

export default RankItem;
