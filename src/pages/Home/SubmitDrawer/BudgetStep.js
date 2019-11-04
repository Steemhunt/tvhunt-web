import React from "react";
import { Icon, InputNumber, Slider } from "antd";
import dogCoin from "assets/images/dog-coin.svg";
import pacman from "assets/images/pacman.svg";
import donut from "assets/images/donut.svg";

const AnswerPreview = props => {
  const answers = ["Horses", "Cars", "People"];
  const correct = ["Cars"];

  return (
    <div className="answer-preview">
      <div className="donuts">
        <Icon
          component={() => <img className="custom-icon" src={donut} alt="" />}
        />
        5 Donuts
      </div>

      <div className="question big">
        For a recent study, scientists taught rats to ride tiny what?
      </div>

      {answers.map(a => (
        <div className={`answer ${correct.includes(a) && "correct"}`} key={a}>
          {a}
        </div>
      ))}
    </div>
  );
};

const BudgetStep = props => {
  return (
    <div className="step-budget">
      <div className="title big">SET BUDGET</div>
      <img className="dog-img" src={dogCoin} alt="" />
      <div className="desc">
        Set total budget for bounties that will distribute to people who answer
        correctly.
      </div>
      <hr />
      <div>TOTAL BUDGET</div>
      <div className="budget-container">
        <InputNumber
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          value={0}
        />
        <div className="budget-slider-container">
          <Slider className="budget-slider" />
        </div>
      </div>
      <div className="estimation-text">ESTIMATION & PREVIEW</div>
      <div className="estimation-container">
        <div>
          <Icon
            component={() => (
              <img className="custom-icon" src={pacman} alt="" />
            )}
          />
          Minimum audiences to watch: <span className="text-yellow">105</span>
        </div>
        <div>
          <Icon
            component={() => <img className="custom-icon" src={donut} alt="" />}
          />
          Max Donuts per person: <span className="primary">105</span>
        </div>
      </div>

      <AnswerPreview />
      <AnswerPreview />
      <AnswerPreview />
    </div>
  );
};

export default BudgetStep;
