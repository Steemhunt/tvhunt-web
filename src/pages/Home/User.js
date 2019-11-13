import React, { useContext } from "react";
import { Icon, Tooltip } from "antd";
import AuthContext from "contexts/AuthContext";
import VideoContext from "contexts/VideoContext";
import AppContext from "contexts/AppContext";

const User = props => {
  const { login, logout, user } = useContext(AuthContext);
  const { loadMyUploads, loadMyVotes } = useContext(VideoContext);
  const { updateState } = useContext(AppContext);
  return user ? (
    <Tooltip
      className="login"
      placement="bottomLeft"
      overlayClassName="tooltip-menu"
      title={
        <div>
          <div onClick={loadMyUploads} className="tooltip-menu-item">
            <Icon type="upload" style={{ marginRight: 4 }} /> My Uploads
          </div>
          <div onClick={loadMyVotes} className="tooltip-menu-item">
            <Icon type="caret-up" style={{ marginRight: 4 }} /> My Votes
          </div>
          <div onClick={logout} className="tooltip-menu-item">
            <Icon type="poweroff" style={{ marginRight: 4 }} /> Log out
          </div>
        </div>
      }
    >
      <div className="secondary">
        {user.username.split(".")[0]}
        <Icon type="caret-down" style={{ fontSize: 12, marginLeft: 4 }} />
      </div>
    </Tooltip>
  ) : (
    <div className="login" onClick={() => updateState({ loginModal: true })}>
      Sign in
    </div>
  );
};

export default User;
