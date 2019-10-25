import React from "react";
import IconTag from "components/IconTag";
import donutImg from "assets/images/donut.svg";
import QuizAndEarn from './QuizAndEarn';
import PropTypes from "prop-types";

const SideBar = props => {
  return (
    <div className="side-bar">

      <div className="profile-container">
        <div className="profile-img">
          <img src={"http://placekitten.com/200/200"} alt="" />
        </div>
        <div className="name small">Arkell Charles</div>
        <IconTag text="10.5k" src={donutImg} />
      </div>

      <QuizAndEarn/>


    </div>
  );
};

SideBar.propTypes = {};

SideBar.defaultProps = {};

export default SideBar;
