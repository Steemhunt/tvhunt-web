import React, { useContext } from "react";
import AppContext from "contexts/AppContext";
import AuthContext from "contexts/AuthContext";
import { Button, Modal } from "antd";
import logo from "assets/images/logo-tvh.svg";
import tvhCircle from "assets/images/tvh-circle.svg";
import blockstackCircle from "assets/images/blockstack-circle.svg";

const LoginModal = props => {
  const { loginModal, updateState } = useContext(AppContext);
  const { login } = useContext(AuthContext);

  return (
    <Modal
      visible={loginModal}
      onCancel={() => updateState({ loginModal: false })}
      footer={null}
      wrapClassName="login-modal"
    >
      <div className="content">
        <img className="logo" src={logo} alt="LOL Hunt Logo" />
        <div className="row-align-center dash-container">
          <img className="circle-image" src={tvhCircle} alt="" />
          <div className="dashed-dots" />
          <img className="circle-image" src={blockstackCircle} alt="" />
        </div>

        <div className="secondary title">
          Authentic Trending Videos on BlockChain
        </div>
        <div className="text big desc">
          LOL Hunt does not control your upvoting or hunting video content. We
          use Blockstack, a revolutionary user authentication system that gives
          the user full controllability of his/her data usage.
        </div>

        <Button className="primary-button inverse" onClick={login}>
          CONTINUE WITH BLOCKSTACK
        </Button>
        <a
          className="what-is-blockstack"
          href="https://blockstack.org/try-blockstack"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text small hover-link">What is Blockstack?</div>
        </a>
      </div>
    </Modal>
  );
};

export default LoginModal;
