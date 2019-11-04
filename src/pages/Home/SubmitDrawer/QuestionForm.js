import React, { useState } from "react";
import { Icon, Input, Slider } from "antd";
import PlusMinus from "components/PlusMinus";
import rightChecked from "assets/images/right-checked.svg";
import rightUnchecked from "assets/images/right-unchecked.svg";
import _ from "lodash";

const Choices = props => {
  const [choices, setChoices] = useState(["Horses", "Spider"]);
  const [answers, setAnswers] = useState([]);
  return (
    <div className="choices">
      <div>Choices</div>
      {choices.map((choice, index) => {
        return (
          <div className="answer">
            <Input value={choice} />
            <img
              src={answers.includes(choice) ? rightChecked : rightUnchecked}
              alt=""
              onClick={() => {
                let newAnswers = _.clone(answers);
                if (answers.includes(choice)) {
                  setAnswers(_.pull(newAnswers, choice));
                } else {
                  setAnswers(newAnswers.concat(choice));
                }
              }}
            />
          </div>
        );
      })}
      <div
        className="add-choice"
        onClick={() => setChoices(choices.concat(""))}
      >
        <Icon type="plus-circle" style={{ fontSize: 20, marginRight: 8 }} />
        Add Choice
      </div>
    </div>
  );
};

const QuestionForm = props => {
  const [question, setQuestion] = useState("");
  return (
    <div className="question-form">
      <div>QUESTION 1</div>
      <div className="form">
        <div>Donuts per answer</div>
        <PlusMinus />

        <div>Display this question at</div>
        <Slider />
        <div className="question-text">Question</div>
        <Input.TextArea
          placeholder="Your question here"
          maxLength={100}
          onChange={e => setQuestion(e.target.value)}
        />
        <div className="question-max-length">{question.length}/100</div>

        <Choices />
      </div>
    </div>
  );
};

export default QuestionForm;
