import React, { useContext } from "react";
import { Icon, Button } from "antd";
import VideoContext from "contexts/VideoContext";
import SubmitContext from "contexts/SubmitContext";
import RankingList from "./RankingList";
import User from "./User";
import logo from "assets/images/logo-tvh.svg";
import isMobile from "ismobilejs";

const SideBar = props => {
  const videoContext = useContext(VideoContext);
  const submitContext = useContext(SubmitContext);
  const { fullscreen } = videoContext.value;
  const mobile = isMobile().phone;

  return (
    <div
      className={`side-bar ${mobile && "mobile"} ${fullscreen && "fullscreen"}`}
    >
      <div className="top-header">
        <img className="logo mobile-visible" src={logo} alt="logo" />
        <div className="row-align-center hide-ranking mobile-hidden">
          <div
            className="row-align-center"
            onClick={() =>
              videoContext.updateState({ fullscreen: !fullscreen })
            }
          >
            <Icon type="menu-unfold" />
          </div>
          <User />
        </div>

        <div className="mobile-hidden">
          <Button
            onClick={() => submitContext.updateState({ showDrawer: true })}
            className="primary-button"
          >
            HUNT VIDEO
          </Button>
        </div>

        <div className="mobile-visible">
          <User />
          <Icon
            className="add-circle"
            type="plus-circle"
            onClick={() => submitContext.updateState({ showDrawer: true })}
          />
        </div>
      </div>

      <RankingList />
    </div>
  );
};

export default SideBar;
