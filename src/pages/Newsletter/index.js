import React from "react";
import { Input, Button } from "antd";
import { Link } from "react-router-dom";
import poopImg from "assets/images/poop.svg";
import poopElmo from "assets/videos/poop-elmo.mp4";
import MetaHelmet from "components/MetaHelmet";

const Newsletter = props => {
  return (
    <div className="newsletter-page">
      <MetaHelmet
        title="Make your number two great again 💩 - Poop Letter"
        description="Subscribe to receive the funniest video of the day"
        pathname="/poop-letter"
      />
      <div className="content">
        <img className="poop-logo" src={poopImg} alt="" />
        <div className="title">Poop Letter</div>
        <video className="poop-elmo" src={poopElmo} alt="" autoPlay loop />

        <div className="text-container big">
          Dear daily pooper,
          <br />
          <br />
          We know that sometimes your daily number two is boring when you have
          nothing to check out on your phone. So, we have prepared the funniest
          videos to entertain you while you do your business.
          <br />
          <br />
          Let’s make your number two great again 💩
          <br />
          <br />
          <Input placeholder="Email address" addonAfter="SUBSCRIBE NOW" />
          <br />
          <br />
          <Link className="small" to="/">
            <span role="img" aria-label="home">
              👉
            </span>{" "}
            Check Funny Video Chart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
