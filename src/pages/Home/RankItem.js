import React from "react";
import { Icon, Button } from "antd";

const RankItem = props => {
  const {rank} = props;
  return (
    <div className="row-align-center rank-item">
      <div className="secondary rank small">{rank}</div>
      <div className="row-align-center video-detail">
        <img src="https://placekitten.com/200/200" alt="" />
        <div className="text small">DJ Lady Style - Dancehall Mixhawiefhiwefiasjd</div>
      </div>
      <Button className="primary-button upvote-button">
        <Icon type="caret-up"/>
        1,000
      </Button>
    </div>
  );
};

export default RankItem;
