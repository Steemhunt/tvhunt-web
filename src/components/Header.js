import React, { useContext } from "react";
import { Icon, Popconfirm, notification } from "antd";
import { withRouter } from "react-router-dom";
import VideoContext from "contexts/VideoContext";
import logo from "assets/images/logo-tvh.svg";
import youtubeIcon from "assets/images/youtube-brands.svg";
import shareIcon from "assets/images/share-solid.svg";
import flagIcon from "assets/images/flag-solid.svg";

const Header = props => {
  const { flagVideo, currentVideo, updateState, value } = useContext(
    VideoContext
  );
  const { fullscreen } = value;
  return (
    <div className="header mobile-hidden mobile-landscape-hidden">
      <div className="mobile-youtube-header row-space-between">
        <Icon
          className="secondary"
          onClick={() => updateState({ currentVideo: null, fullscreen: false })}
          type="menu-unfold"
        />
        <div className="row-align-center">
          <Popconfirm
            title="Do you think this video does not fit here?"
            onConfirm={() => flagVideo(currentVideo.id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <img
              src={flagIcon}
              alt=""
              className="flag-button hover-link"
              type="link"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                notification["success"]({ message: "Copied to clipboard" });
              }}
            />
          </Popconfirm>
          <a
            href={`https://youtube.com/watch?v=${currentVideo &&
              currentVideo.unique_id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className="youtube-button hover-link"
              src={youtubeIcon}
              alt=""
            />
          </a>
          <img
            src={shareIcon}
            alt=""
            className="share-button hover-link"
            type="link"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              notification["success"]({ message: "Copied to clipboard" });
            }}
          />
        </div>
      </div>

      <a href="/">
        <img className="header-logo" src={logo} alt="LOL Hunt Logo" />
      </a>

      {!fullscreen && (
        <a
          href="https://www.producthunt.com/posts/lol-hunt?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lol-hunt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=175492&theme=dark"
            alt="LOL Hunt - Daily hunt for funny Youtube clips, powered by Blockstack | Product Hunt Embed"
            style={{
              width: "250px",
              height: "54px"
            }}
          />
        </a>
      )}
    </div>
  );
};

export default withRouter(Header);
