import React, { useEffect, useState, useContext } from "react";
import { Button } from "antd";
import SubmitContext from "contexts/SubmitContext";
import hideImg from "assets/images/hide.svg";

const SideBar = props => {
  const submitContext = useContext(SubmitContext);

  return (
    <div className="side-bar">
      <div className="top-header">
        <div className="row-align-center">
          <img src={hideImg} alt="" />
          <div className="hide-ranking">Hide Ranking</div>
        </div>
        <Button
          onClick={() => submitContext.updateState({ showDrawer: true })}
          className="primary-button"
        >
          HUNT VIDEO
        </Button>
      </div>
    </div>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
