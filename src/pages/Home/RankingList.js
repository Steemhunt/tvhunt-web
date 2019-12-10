import React, { useContext } from "react";
import { withRouter } from "react-router";
import { Icon } from "antd";
import VideoContext from "contexts/VideoContext";
import RankItem from "./RankItem";
import ShowMoreItems from "./ShowMoreItems";
import moment from "moment";

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

const RankingList = props => {
  const { value } = useContext(VideoContext);
  const { tab, daysPlaylist, totalCountMap, loading } = value;

  return (
    <div className={`ranking-list`}>
      <div className="list">
        {loading && <Icon className="primary loading-circle" type="loading" />}
        {Object.keys(daysPlaylist).map((days_ago, index) => {
          const list = daysPlaylist[days_ago];
          const sortedFilteredList =
            tab === "all" ? list : list.filter(v => v.tags.includes(tab));
          // if (sortedFilteredList.length === 0) return null;
          return (
            <div key={days_ago}>
              <div className="section-container">
                <div
                  className="title secondary"
                  style={index === 0 ? { marginTop: 16 } : {}}
                >
                  {daysAgoToString(parseInt(days_ago))}
                </div>
                <div className="text small compete-text">
                  Total {totalCountMap[days_ago]} videos competed
                </div>
              </div>
              {sortedFilteredList.map((item, index) => (
                <RankItem key={index} rank={index + 1} data={item} />
              ))}
              {totalCountMap[days_ago] > list.length && (
                <ShowMoreItems nextDay={days_ago} text="Show More" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(RankingList);
