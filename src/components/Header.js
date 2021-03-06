import React, { useContext } from "react";
import { Icon, Modal, notification } from "antd";
import { withRouter } from "react-router-dom";
import VideoContext from "contexts/VideoContext";
import logo from "assets/images/logo-tvh.svg";
import youtubeIcon from "assets/images/youtube-brands.svg";
import shareIcon from "assets/images/share-solid.svg";
import flagIcon from "assets/images/flag-solid.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AuthContext from 'contexts/AuthContext';
import _ from "lodash";

const Header = props => {
  const { flagUnflag, updateState, value } = useContext(VideoContext);
  const { user } = useContext(AuthContext);
  const { fullscreen, flagged, currentVideo } = value;

  const alreadyFlagged =
    currentVideo &&
    flagged &&
    _.find(flagged, ["id", currentVideo.id]) !== undefined;

  return (
    <div className="header mobile-hidden mobile-landscape-hidden">
      <div className="mobile-youtube-header row-space-between">
        <Icon
          className="secondary"
          onClick={() => updateState({ currentVideo: null, fullscreen: false })}
          type="menu-unfold"
        />
        <div className="row-align-center">
          <img
            src={flagIcon}
            alt=""
            className="flag-button hover-link"
            type="link"
            onClick={() => Modal.confirm({
                title: 'Flag Video',
                content: alreadyFlagged ? "Unflag video?" : "Do you think this video does not fit here?",
                okText: 'Yes',
                cancelText: 'Cancel',
                onOk() {
                  return flagUnflag(currentVideo.id, user);
                }
              })
            }
          />
          <a
            href={`https://youtube.com/watch?v=${currentVideo && currentVideo.unique_id}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              className="youtube-button hover-link"
              src={youtubeIcon}
              alt=""
            />
          </a>
          <CopyToClipboard text={window.location.href} onCopy={() => notification["success"]({ message: "Copied to clipboard" })}>
            <img
              src={shareIcon}
              alt=""
              className="share-button hover-link"
              type="link"
            />
          </CopyToClipboard>
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
