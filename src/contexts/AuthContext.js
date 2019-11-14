import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });
const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends Component {
  state = {
    user: null,
    authenticating: false
  };

  async componentDidMount() {
    this.setState({ authenticating: true });
    if (userSession.isUserSignedIn()) {
      const user = await userSession.loadUserData();
      this.setState({ user, authenticating: false });
    } else if (userSession.isSignInPending()) {
      const user = await userSession.handlePendingSignIn();
      this.setState({ user, authenticating: false });
    } else {
      this.setState({ authenticating: false });
    }
  }

  login = () => {
    userSession.redirectToSignIn();
  };

  logout = () => {
    userSession.signUserOut(window.location.origin);
  };

  updateState = state => {
    this.setState(state);
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          login: this.login,
          signup: this.signup,
          logout: this.logout,
          updateState: this.updateState
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AuthProvider, Consumer as AuthConsumer };

export default AuthContext;
