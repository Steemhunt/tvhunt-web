import React, { useContext, useState } from "react";
import { Icon } from "antd";
import VideoContext from "contexts/VideoContext";

const ShowMoreItems = props => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const { nextDay, text } = props;
  const { loadVideos } = useContext(VideoContext);

  if (!visible) return null;

  return (
    <div
      className="primary uppercase small show-more hover-link"
      onClick={() => {
        setLoading(true);
        loadVideos(null, null, nextDay, false, ({ success }) => {
          setLoading(false);
          if (!success) setVisible(false);
        });
      }}
    >
      {loading ? <Icon type="loading" /> : text}
    </div>
  );
};

export default ShowMoreItems;
