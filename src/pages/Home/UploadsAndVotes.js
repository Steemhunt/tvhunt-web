import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Icon, Button } from "antd";
import VideoContext, {
  MODE_TV,
  MODE_UPLOADED,
  MODE_VOTED,
  MODE_TAG
} from "contexts/VideoContext";
import RankItem from "./RankItem";
import isMobile from "ismobilejs";

const EmptyMessage = props => {
  let title = "";
  let action = "";
  if (props.type === MODE_UPLOADED) {
    title = "UPLOADS";
    action = "uploaded";
  } else if (props.type === MODE_VOTED) {
    title = "VOTES";
    action = "upvoted";
  }

  return (
    <div className="empty-list-message">
      <div className="title secondary">{title}</div>
      <div className="description text">
        Opps! Haven’t {action} any videos yet? You can see all the videos that
        you’ve {action} here. Please join the ranking curation now!
      </div>
      <Button className="primary-button inverse" onClick={props.onClick}>
        CHECK NOW
      </Button>
    </div>
  );
};

const UploadsAndVotes = props => {
  const { value, updateState } = useContext(VideoContext);
  const { mode, uploads, votes, tags, loading } = value;

  const mobile = isMobile().phone;
  let list = [];

  if (mode === MODE_UPLOADED) list = uploads;
  else if (mode === MODE_VOTED) list = votes;
  else if (mode === MODE_TAG) list = tags;

  const back = () => {
    props.history.push("/");
    updateState({ mode: MODE_TV });
  };

  return (
    <div className={`ranking-list ${mobile && "mobile"}`}>
      {!loading && list.length === 0 ? (
        <EmptyMessage type={mode} onClick={back} />
      ) : (
        <>
          <div className="secondary small hover-link" onClick={back}>
            <Icon type="left" style={{ marginRight: 4 }} />
            BACK TO RANKING
          </div>
          <div className="list">
            {loading && (
              <Icon className="primary loading-circle" type="loading" />
            )}
            {list.map((item, index) => (
              <RankItem key={index} rank={index + 1} data={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(UploadsAndVotes);
