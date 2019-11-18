import React from "react";
import { withRouter } from "react-router-dom";
import logo from "assets/images/logo-tvh.svg";
import isMobile from "ismobilejs";

const Header = props => {
  if (isMobile().phone) return null;

  return (
    <div className={`header`}>
      <a href="/"><img className="logo" src={logo} alt="TV Hunt Logo" /></a>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
