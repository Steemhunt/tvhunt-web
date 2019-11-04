import React from "react";

const RoundButton = props => {
  const { className, selected = false, containerStyle = {}, children } = props;

  return (
    <div
      className={`round-button ${className} ${selected && "selected"}`}
      style={containerStyle}
    >
      <div className="text">{children}</div>
    </div>
  );
};

export default RoundButton;
