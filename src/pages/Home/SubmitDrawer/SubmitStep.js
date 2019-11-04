import React, { useContext } from "react";
import SubmitContext from "contexts/SubmitContext";
import { Button, Input } from "antd";
import dogDonut from "assets/images/dog-donut@3x.png";
import youtube from "assets/images/youtube.svg";

const SubmitStep = props => {
  const { step, updateState } = useContext(SubmitContext);
  return (
    <div className="step-submit">
      <div className="title big">SUBMIT VIDEO</div>
      <img className="dog-img" src={dogDonut} alt="" />
      <div className="desc">
        Make videos more likable by adding fun quiz questions with donut
        bounties.
      </div>

      <div className="input-desc">Input URL of Youtube Video</div>
      <div className="input-container">
        <img src={youtube} alt="" />
        <Input placeholder="https://www.youtube.com/watch?v=…" />
      </div>
      <Button onClick={() => updateState({ step: step + 1 })}>Submit</Button>
    </div>
  );
};

export default SubmitStep;
