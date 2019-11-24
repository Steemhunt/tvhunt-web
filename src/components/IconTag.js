import React from "react";
import { withRouter } from "react-router";

const IconTag = props => {
  const { style, src, text, url } = props;
  return (
    <div
      className="icon-tag hover-link"
      style={style}
      onClick={() => {
        props.history.push(`/tags/${url}`);
      }}
    >
      <img src={src} alt="" />
      <div>{text}</div>
    </div>
  );
};

export default withRouter(IconTag);
