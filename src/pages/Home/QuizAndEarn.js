import React from "react";
import { Button } from "antd";
import QuizItem from "components/QuizItem";
import PropTypes from "prop-types";

const QuizAndEarn = props => {
  return (
    <div className="quiz-and-earn">
      <Button className="donut-earn-button">
        <div className="small">
          Total <span className="primary">25 Donuts</span> to grab
        </div>
      </Button>

      <div className="answers">
        <QuizItem />
        <QuizItem />
        <QuizItem />
        <QuizItem />
      </div>
    </div>
  );
};

QuizAndEarn.propTypes = {};

QuizAndEarn.defaultProps = {};

export default QuizAndEarn;
