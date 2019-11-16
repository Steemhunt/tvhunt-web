import React, { useContext, useMemo } from "react";
import { withRouter } from "react-router";
import { Icon, Tabs } from "antd";
import VideoContext, { MODE_TV } from "contexts/VideoContext";
import RankItem from "./RankItem";
import ShowMoreItems from "./ShowMoreItems";
import isMobile from "ismobilejs";
import moment from "moment";
import _ from "lodash";

function daysAgoToString(daysAgo) {
  if (daysAgo === 0) {
    return "Today";
  }
  if (daysAgo === 1) {
    return "Yesterday";
  }
  const date = new Date(new Date() - 86400000 * daysAgo);
  // Return weekday if less than a week
  if (daysAgo < 7) {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return weekdays[date.getDay()];
  }
  return moment(date).format("MMMM Do");
}

const { TabPane } = Tabs;

const RankingList = props => {
  const {
    match: {
      params: { topic, slug }
    }
  } = props;

  const { value, loadVideos, updateState } = useContext(VideoContext);
  const { mode, tabs, tab, daysPlaylist, loading } = value;

  const mobile = isMobile().phone;

  return useMemo(
    () => (
      <div className={`ranking-list ${mobile && "mobile"}`}>
        {mode === MODE_TV ? (
          <>
            <Tabs
              className="tabs"
              activeKey={tab}
              onChange={tab => updateState({ tab })}
            >
              <TabPane tab={"All"} key={"all"} />
              {tabs.map((tab, index) => {
                return <TabPane tab={_.capitalize(tab)} key={tab} />;
              })}
            </Tabs>
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
          {loading && <Icon className="primary" type="loading" />}
          {Object.keys(daysPlaylist)
            .sort()
            .map(days_ago => {
              const list = daysPlaylist[days_ago];
              const sortedFilteredList =
                tab === "all" ? list : list.filter(v => v.tags.includes(tab));
              if (sortedFilteredList.length === 0) return null;
              return (
                <div key={days_ago}>
                  <div className="title secondary">
                    {daysAgoToString(days_ago)}
                  </div>
                  <div className="text small compete-text">
                    Total {list.length} videos competed
                  </div>
                  {sortedFilteredList.map((item, index) => (
                    <RankItem key={index} rank={index + 1} data={item} />
                  ))}
                  {list.length === 10 && (
                    <ShowMoreItems
                      nextDay={days_ago}
                      text="Show more from this day"
                    />
                  )}
                </div>
              );
            })}
          <ShowMoreItems
            nextDay={Object.keys(daysPlaylist).length + 1}
            text={"Load previous day"}
          />
        </div>
      </div>
    ),
    [daysPlaylist, mode, tab]
  );
};

export default withRouter(RankingList);
