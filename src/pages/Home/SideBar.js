import React, { useEffect, useState, useContext } from "react";
import SubmitContext from "contexts/SubmitContext";
import IconTag from "components/IconTag";
import donutImg from "assets/images/donut.svg";
import QuizAndEarn from "./QuizAndEarn";
import PropTypes from "prop-types";

const SideBar = props => {
  const submitContext = useContext(SubmitContext);
  return (
    <div className="side-bar">
      <div className="top-header">
        <div onClick={() => submitContext.updateState({ showDrawer: true })}>
          Submit Video
        </div>
        <hr />
        <div>My Page</div>
      </div>

      <div className="profile-container">
        <div className="profile-img">
          <img src={"http://placekitten.com/200/200"} alt="" />
        </div>
        <div className="name small">Arkell Charles</div>
        <IconTag text="10.5k" src={donutImg} />
      </div>

      <QuizAndEarn />
    </div>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
