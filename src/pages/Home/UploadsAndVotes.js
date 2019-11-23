import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Icon, Button } from "antd";
import VideoContext, {
  MODE_TV,
  MODE_UPLOADED,
  MODE_VOTED,
  MODE_TAG
} from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import RankItem from "./RankItem";
import numeral from "numeral";

const Message = withRouter(props => {
  const { list, type } = props;
  let title = "";
  let action = "";
  let searchResult = "";
  if (type === MODE_UPLOADED) {
    title = "SHARED VIDEOS";
    action = "shared";
    searchResult = `You have shared ${numeral(list.length).format(
      "0,0"
    )} videos so far`;
  } else if (type === MODE_VOTED) {
    title = "VOTES";
    action = "upvoted";
    searchResult = `You have voted ${numeral(list.length).format(
      "0,0"
    )} videos so far`;
  } else if (type === MODE_TAG) {
    const {
      match: {
        params: { topic, slug }
      }
    } = props;
    title = topic === "tags" ? slug : topic;
    action = "tagged";
    searchResult = `${numeral(list.length).format(
      "0,0"
    )} videos  shared in #${title}`;
  }

  return (
    <div className="empty-list-message">
      <div className="title secondary">{title}</div>
      <div className="description text small">
        {list.length > 0
          ? searchResult
          : `Oops! Haven’t ${action} any videos yet? You can see all the videos that
        you’ve ${action} here. Share a 😂video you discovered today!`}
      </div>
      {list.length === 0 && (
        <Button className="primary-button inverse" onClick={props.onClick}>
          UPLOAD NOW
        </Button>
      )}
    </div>
  );
});

const UploadsAndVotes = props => {
  const { value, updateState } = useContext(VideoContext);
  const submitContext = useContext(SubmitContext);
  const { mode, uploads, votes, tags, loading } = value;

  let list = [];

  if (mode === MODE_UPLOADED) list = uploads;
  else if (mode === MODE_VOTED) list = votes;
  else if (mode === MODE_TAG) list = tags;

  const back = () => {
    props.history.push("/");
    updateState({ mode: MODE_TV });
  };

  return (
    <div className={`ranking-list`}>
      <div className="secondary small hover-link back-to-rank" onClick={back}>
        <Icon type="left" style={{ marginRight: 4 }} />
        BACK TO RANKING
      </div>

      {!loading && (
        <Message
          type={mode}
          list={list}
          onClick={() => submitContext.updateState({ showDrawer: true })}
        />
      )}

      <div className="list">
        {loading && <Icon className="primary loading-circle" type="loading" />}
        {list.map((item, index) => (
          <RankItem key={index} rank={index + 1} data={item} />
        ))}
      </div>
    </div>
  );
};

export default withRouter(UploadsAndVotes);
