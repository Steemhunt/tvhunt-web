import React from "react";
import PropTypes from "prop-types";

const IconTag = props => {
  const { style, src, text } = props;
  return (
    <div className="icon-tag hover-link" style={style}>
      <img src={src} alt="" />
      <div>{text}</div>
    </div>
  );
};

IconTag.propTypes = {
  style: PropTypes.object
};

IconTag.defaultProps = {
  style: {}
};

export default IconTag;
