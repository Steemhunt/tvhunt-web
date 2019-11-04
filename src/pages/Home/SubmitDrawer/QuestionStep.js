import React from "react";
import { Icon, Button } from "antd";
import dogIdea from "assets/images/dog-idea.svg";
import QuestionForm from "./QuestionForm";

const QuestionStep = props => {
  return (
    <div className="step-question">
      <div className="title big">ADD QUESTIONS</div>
      <img className="dog-img" src={dogIdea} alt="" />
      <div className="desc">
        Add serial questions about the video, in which people can find the
        answers.
      </div>

      <hr />
      <div>YOUR VIDEO</div>
      <div className="video-preview">
        <img src={"http://placekitten.com/200/200"} alt="" />
        <div className="text-container">
          <div className="text-white">
            Torquem detraxit hosti et quidem faciunt, ut de
          </div>
          <div>Video duration: 03:52</div>
        </div>
      </div>

      <Button className="pink-highlight-button">
        <div className="small">
          You can make <span className="primary">2 questions</span> for your
          video
        </div>
      </Button>

      <QuestionForm />

      <Button className="add-question-button">
        <Icon type="plus" />
        Add more question
      </Button>
    </div>
  );
};

export default QuestionStep;
