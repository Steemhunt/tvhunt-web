import React from "react";
import PropTypes from "prop-types";
import donutImg from "assets/images/donut.svg";

const Answer = ({ text = "Answer" }) => {
  return <div className="answer-choice small">{text}</div>;
};

const QuizItem = props => {
  return (
    <div className="quiz-item">
      <div className="row-align-center donut-amount">
        <img src={donutImg} alt="" />
        <div className="small">5 Donuts</div>
      </div>
      <div className="question big">
        For a recent study, scientists taught rats to ride tiny what?
      </div>
      <Answer text="Horses" />
      <Answer text="Cars" />
      <Answer text="People" />
    </div>
  );
};

QuizItem.propTypes = {};

QuizItem.defaultProps = {};

export default QuizItem;
