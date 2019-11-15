import React from "react";
import { withRouter } from "react-router-dom";
import logo from "assets/images/logo-tvh.svg";
import isMobile from "ismobilejs";

const Header = props => {
  if (isMobile().phone) return null;
  
  return (
    <div className={`header`}>
      <img className="logo" src={logo} alt="logo" />
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
