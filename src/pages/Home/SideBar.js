import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import AuthContext from "contexts/AuthContext";
import RankingList from "./RankingList";

const SideBar = props => {
  const videoContext = useContext(VideoContext);
  const submitContext = useContext(SubmitContext);
  const { login, logout, user } = useContext(AuthContext);
  const { fullscreen } = videoContext.value;

  return (
    <div className={`side-bar ${fullscreen && "fullscreen"}`}>
      <div className="top-header">
        <div className="row-align-center hide-ranking">
          <div
            className="row-align-center"
            onClick={() =>
              videoContext.updateState({ fullscreen: !fullscreen })
            }
          >
            <Icon type="caret-left" />
            <Icon type="caret-right" />
          </div>
          {user ? (
            <div className="login" onClick={logout}>
              {user.username.replace(".id.blockstack", "")}
            </div>
          ) : (
            <div className="login" onClick={login}>
              Join/Login
            </div>
          )}
        </div>
        <Button
          onClick={() => submitContext.updateState({ showDrawer: true })}
          className="primary-button"
        >
          HUNT VIDEO
        </Button>
      </div>

      <RankingList />
    </div>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
