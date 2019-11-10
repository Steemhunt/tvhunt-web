import React, { useContext } from "react";
import AppContext from "contexts/AppContext";
import { Button, Modal } from "antd";
import logo from "assets/images/logo-tvh.svg";
import tvhCircle from "assets/images/tvh-circle.svg";
import blockstackCircle from "assets/images/blockstack-circle.svg";

const OnboardingModal = props => {
  const { onboardingModal, updateState } = useContext(AppContext);

  return (
    <Modal
      visible={onboardingModal}
      onCancel={() => updateState({ onboardingModal: false })}
      footer={null}
      wrapClassName="onboarding-modal"
    >
      <div className="content">
        <img className="logo" src={logo} alt="" />
        <div>Hello</div>
        <div className="row-align-center">
          <img className="circle-image" src={tvhCircle} alt="" />
          <div className="dashed-dots" />
          <img className="circle-image" src={blockstackCircle} alt="" />
        </div>

        <div className="secondary title">
          Authentic Trending Videos on BlockChain
        </div>
        <div className="text big desc">
          TV Hunt does not control your upvoting or hunting video content. We
          use Blockstack, a revolutionary user authentication system that gives
          the user full controllability of his/her data usage.
        </div>

        <Button
          className="primary-button inverse"
          onClick={() => updateState({ onboardingModal: false })}
        >
          DIVE IN NOW
        </Button>
      </div>
    </Modal>
  );
};

export default OnboardingModal;
