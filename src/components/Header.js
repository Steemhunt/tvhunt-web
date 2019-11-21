import React from "react";
import { withRouter } from "react-router-dom";
import logo from "assets/images/logo-tvh.svg";

const Header = props => {
  return (
    <div className="header mobile-hidden mobile-landscape-hidden">
      <a href="/">
        <img className="header-logo" src={logo} alt="LOL Hunt Logo" />
      </a>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default withRouter(Header);
