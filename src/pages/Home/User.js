import React, { useContext } from "react";
import { Icon, Tooltip } from "antd";
import AuthContext from "contexts/AuthContext";
import VideoContext from "contexts/VideoContext";
import AppContext from "contexts/AppContext";
import { displayUsername } from "utils/authHelper";

const User = props => {
  const { logout, user } = useContext(AuthContext);
  const { loadMyUploads, loadMyVotes } = useContext(VideoContext);
  const { updateState } = useContext(AppContext);

  return (
    <div className="row-align-center">
      <div
        className="poop-mail hover-link"
        onClick={() => updateState({ loginModal: true })}
      >
        <span role="img" aria-label="poop">
          💩
        </span>{" "}
        mail
      </div>
      {user ? (
        <Tooltip
          className="login"
          placement="bottomLeft"
          overlayClassName="tooltip-menu"
          title={
            <div>
              <div onClick={loadMyUploads} className="tooltip-menu-item">
                <Icon type="upload" style={{ marginRight: 4 }} /> My Hunts
              </div>
              <div onClick={loadMyVotes} className="tooltip-menu-item">
                <Icon type="caret-up" style={{ marginRight: 4 }} /> My Votes
              </div>
              <div onClick={loadMyVotes} className="tooltip-menu-item">
                <Icon type="read" style={{ marginRight: 4 }} /> Terms
              </div>
              <div onClick={loadMyVotes} className="tooltip-menu-item">
                <Icon type="smile" style={{ marginRight: 4 }} /> Privacy
              </div>
              <div onClick={logout} className="tooltip-menu-item">
                <Icon type="appstore" style={{ marginRight: 4 }} /> Blockstack
              </div>
              <div onClick={logout} className="tooltip-menu-item">
                <Icon type="poweroff" style={{ marginRight: 4 }} /> Log out
              </div>
            </div>
          }
        >
          <div className="secondary">
            {displayUsername(user, "Member")}
            <Icon type="caret-down" style={{ fontSize: 12, marginLeft: 4 }} />
          </div>
        </Tooltip>
      ) : (
        <>
          <div
            className="login hover-link"
            onClick={() => updateState({ loginModal: true })}
          >
            Sign in
          </div>
          <Tooltip
            className="login"
            placement="bottomLeft"
            overlayClassName="tooltip-menu"
            title={
              <div>
                <div onClick={loadMyVotes} className="tooltip-menu-item">
                  <Icon type="read" style={{ marginRight: 4 }} /> Terms
                </div>
                <div onClick={loadMyVotes} className="tooltip-menu-item">
                  <Icon type="smile" style={{ marginRight: 4 }} /> Privacy
                </div>
                <div onClick={logout} className="tooltip-menu-item">
                  <Icon type="appstore" style={{ marginRight: 4 }} /> Blockstack
                </div>
              </div>
            }
          >
            <Icon type="ellipsis" style={{ fontSize: 16, marginLeft: 14 }} />
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default User;
