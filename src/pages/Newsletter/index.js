import React, { useContext, useState } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import poopImg from "assets/images/poop.svg";
import poopElmo from "assets/videos/poop-elmo.mp4";
import MetaHelmet from "components/MetaHelmet";
import AppContext from "contexts/AppContext";

const Newsletter = props => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { subscribeEmail } = useContext(AppContext);

  return (
    <div className="newsletter-page">
      <MetaHelmet
        title="Make your number two great again 💩 - Poop Letter"
        description="Subscribe and receive a funny video every day"
        pathname="/poop-letter"
        image={`${process.env.REACT_APP_PUBLIC_URL}/poop-image-1200.png`}
      />
      <div className="content">
        <img className="poop-logo" src={poopImg} alt="" />
        <div className="title">Poop Letter</div>
        <video class="poop-elmo" alt="Poop Letter" playsInline autoPlay="autoplay" muted loop>
          <source src={poopElmo}/>
        </video>

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
          {!subscribed ? (
            <>
              <Input
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                addonAfter={
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      subscribeEmail(email, () => {
                        setSubscribed(true);
                      });
                    }}
                  >
                    SUBSCRIBE NOW
                  </div>
                }
              />
              <br />
            </>
          ) : (
            <div className="primary">Subscribed!</div>
          )}
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
