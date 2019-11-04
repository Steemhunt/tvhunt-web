import React from "react";
import minus from "assets/images/minus.svg";
import plus from "assets/images/plus.svg";

const PlusMinus = props => {
  const { style = {} } = props;
  return (
    <div className="plus-minus" style={style}>
      <div className="value-container">
        <img src={minus} alt="" />
        <div>1</div>
        <img src={plus} alt="" />
      </div>
      <div>Donuts</div>
    </div>
  );
};

export default PlusMinus;
