import React from "react";
import { Tabs } from "antd";
import RankItem from "./RankItem";

const { TabPane } = Tabs;

const RankingList = props => {
  return (
    <div className="ranking-list">
      <Tabs className="tabs" defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="All" key="1" />
        <TabPane tab="Tech" key="2" />
        <TabPane tab="LOL" key="3" />
        <TabPane tab="Food" key="4" />
        <TabPane tab="AWWW" key="5" />
        <TabPane tab="Overwatch" key="6" />
        <TabPane tab="Programming" key="7" />
        <TabPane tab="HUNT" key="8" />
      </Tabs>

      <div className="title secondary">TODAY</div>
      <div className="text small compete-text">
        Total 165 videos are competing
      </div>
      <div className="list">
        {new Array(20).fill(undefined).map((item, index) => {
          return <RankItem rank={index + 1} />;
        })}
      </div>
    </div>
  );
};

export default RankingList;
