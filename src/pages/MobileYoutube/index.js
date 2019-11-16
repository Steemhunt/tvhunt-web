import React from "react";
import { withRouter } from "react-router";
import { Icon } from "antd";
import Youtube from "components/Youtube";

const MobileYoutube = props => {
  return (
    <div className="mobile-youtube-container">
      <div className="mobile-youtube-header">
        <Icon onClick={() => props.history.push("/")} type="menu-unfold" />
      </div>
      <Youtube />
    </div>
  );
};

export default withRouter(MobileYoutube);
