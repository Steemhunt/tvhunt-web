import React, { useContext } from "react";
import SubmitContext from "contexts/SubmitContext";
import { Icon, Button, Input } from "antd";
import tv from "assets/images/tv@3x.png";
import youtube from "assets/images/youtube.svg";

const SubmitStep = props => {
  const { videoURL, submitting, getVideoInfo, updateState } = useContext(
    SubmitContext
  );

  return (
    <div className="step-submit">
      <div className="title big">SUBMIT VIDEO</div>
      <img className="dog-img" src={tv} alt="" />
      <div className="desc text">
        LOL Hunt is a daily top chart for funny Youtube clips. You can simply
        share a video that you’ve found today. The daily ranking is based on the
        upvotes.
      </div>

      <div className="input-desc text-white">Input URL of Youtube Video</div>
      <div className="input-container">
        <img src={youtube} alt="" />
        <Input
          placeholder="https://www.youtube.com/watch?v=…"
          value={videoURL}
          onChange={e => updateState({ videoURL: e.target.value })}
        />
      </div>
      <Button
        disabled={submitting}
        onClick={() => {
          getVideoInfo();
        }}
      >
        {submitting ? <Icon type="loading" /> : "Submit"}
      </Button>
    </div>
  );
};

export default SubmitStep;
