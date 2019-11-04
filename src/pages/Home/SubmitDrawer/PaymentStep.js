import React from "react";
import RoundButton from "components/RoundButton";
import BTC from "assets/images/btc.svg";
import ETH from "assets/images/eth.svg";
import STEEM from "assets/images/steem.svg";
import HUNT from "assets/images/hunt.svg";

const PaymentStep = props => {
  return (
    <div className="step-payment">
      <div className="title big">SET BUDGET</div>
      <div className="payment-text">CHOOSE PAYMENT CURRENCY</div>
      <div className="payment-options">
        <RoundButton>USD</RoundButton>
        <RoundButton>KRW</RoundButton>
        <RoundButton>CRYPTO</RoundButton>
      </div>
      <div className="payment-options">
        <RoundButton className="crypto">
          <img src={BTC} alt="" />
          BTC
        </RoundButton>
        <RoundButton className="crypto">
          <img src={ETH} alt="" />
          ETH
        </RoundButton>
        <RoundButton className="crypto">
          <img src={STEEM} alt="" />
          STEEM
        </RoundButton>
        <RoundButton className="crypto">
          <img src={HUNT} alt="" />
          HUNT
        </RoundButton>
      </div>
    </div>
  );
};

export default PaymentStep;
