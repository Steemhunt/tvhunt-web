import React, { useEffect, useContext } from "react";
import AppContext from "contexts/AppContext";
import poopImg from "assets/images/poop.svg";
import { Link, withRouter } from "react-router-dom";
import { Button } from "antd";
import queryString from "query-string";

const Unsubscribe = props => {
  const { search } = props.history.location;
  const { unsubscribeEmail, subscribeEmail } = useContext(AppContext);
  const searchObj = queryString.parse(search);
  const email = searchObj && searchObj.email;

  useEffect(() => {
    if (email) {
      unsubscribeEmail(email);
      console.log(email);
    }
  }, []); //eslint-disable-line

  return (
    <div className="unsubscribe-page">
      <div className="content">
        <img className="poop-icon" src={poopImg} alt="poop-img" />
        <div className="title">You are now unsubscribed!</div>
        <div className="desc big">
          You have been removed from the daily poop mailing list. If this was a
          mistake or you have changed your mind, please click the subscribe
          button again.
        </div>
        <Button
          className="primary-button inverse"
          onClick={() => subscribeEmail(email)}
        >
          Subscribe Again
        </Button>
        <div className="link small">
          <Link to="/">
            <span role="img" aria-label="finger-right">
              👉
            </span>{" "}
            Check Funny Video Chart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Unsubscribe);
