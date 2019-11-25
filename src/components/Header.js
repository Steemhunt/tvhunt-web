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

      <a href="https://www.producthunt.com/posts/lol-hunt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lol-hunt" target="_blank" rel="noopener noreferrer">
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=175492&theme=dark"
          alt="LOL Hunt - Daily hunt for funny Youtube clips, powered by Blockstack | Product Hunt Embed"
          style={{
            width: '250px',
            height: '54px'
          }}
        />
      </a>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
