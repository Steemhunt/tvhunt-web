import React, { useContext } from "react";
import { Icon } from "antd";
import { withRouter } from "react-router-dom";
import VideoContext from "contexts/VideoContext";
import logo from "assets/images/logo-tvh.svg";

const Header = props => {
  const { updateState } = useContext(VideoContext);
  return (
    <div className="header mobile-hidden mobile-landscape-hidden">
      <div className="mobile-youtube-header">
        <Icon
          className="secondary"
          onClick={() => updateState({ currentVideo: null, fullscreen: false })}
          type="menu-unfold"
        />
      </div>

      <a href="/">
        <img className="header-logo" src={logo} alt="LOL Hunt Logo" />
      </a>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
