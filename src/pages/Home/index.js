import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { scrollTop } from "utils/scroller";
import Youtube from "components/Youtube";
import CreateQuizForm from "components/CreateQuizForm";
import numeral from 'numeral';

const Home = props => {
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    scrollTop();
  });

  return (
    <div className="home">
      <Youtube
        player={player}
        setPlayer={setPlayer}
        width={500}
        height={300}
        onTick={ct => {
          console.log("tick called");
          setCurrentTime(ct)}}
      />

      <Button
        onClick={() => {
          alert(player.getCurrentTime());
        }}
        style={{marginTop: 40}}
      >
        Create Quiz at {numeral(currentTime).format("00:00:00")}
      </Button>
      <CreateQuizForm/>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
