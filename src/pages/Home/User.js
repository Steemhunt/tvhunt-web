import React, { useContext } from "react";
import { Icon, Tooltip } from "antd";
import AuthContext from "contexts/AuthContext";
import VideoContext from "contexts/VideoContext";

const User = props => {
  const { login, logout, user } = useContext(AuthContext);
  const { loadMyUploads } = useContext(VideoContext);
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
    <div className="login" onClick={login}>
      Join/Login
    </div>
  );
};

export default User;
