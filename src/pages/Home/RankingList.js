import React, { useEffect, useContext, useMemo } from "react";
import { withRouter } from "react-router";
import { Icon, Tabs } from "antd";
import VideoContext, { MODE_TV } from "contexts/VideoContext";
import RankItem from "./RankItem";
import _ from "lodash";

const { TabPane } = Tabs;

const RankingList = props => {
  const {
    match: {
      params: { topic, slug }
    }
  } = props;

  const { value, loadVideos, updateState, updateCurrentVideo } = useContext(
    VideoContext
  );
  const { mode, tabs, tab, playlist, loading } = value;

  const sortedFilteredList =
    tab === "all" ? playlist : playlist.filter(v => v.tags.includes(tab));

  useEffect(() => {
    loadVideos(topic, slug);
  }, []); //eslint-disable-line

  useEffect(() => {
    updateCurrentVideo(topic, slug);
  }, [topic, slug]); //eslint-disable-line

  let videoCount = 0;

  if (tab === "all") {
    videoCount = playlist.length;
  } else {
    tabs.forEach(t => {
      if (t[0] === tab) videoCount = t[1];
    });
  }

  return (
    <div className="ranking-list">
      {mode === MODE_TV ? (
        <>
          <Tabs
            className="tabs"
            activeKey={tab}
            onChange={tab => updateState({ tab })}
          >
            <TabPane tab={"All"} key={"all"} />
            {tabs.map(tab => {
              return <TabPane tab={_.capitalize(tab[0])} key={tab[0]} />;
            })}
          </Tabs>
          <div className="title secondary">TODAY</div>
          <div className="text small compete-text">
            Total {videoCount} videos are competing
          </div>
        </>
      ) : (
        <div
          className="secondary small hover-link"
          onClick={() => {
            loadVideos(topic, slug);
            updateState({ mode: MODE_TV });
          }}
        >
          <Icon type="left" style={{ marginRight: 4 }} />
          BACK TO RANKING
        </div>
      )}

      <div className="list">
        {loading && <Icon type="loading" />}
        {sortedFilteredList.map((item, index) => {
          return <RankItem key={index} rank={index + 1} data={item} />;
        })}
      </div>
    </div>
  );
};

export default withRouter(RankingList);
