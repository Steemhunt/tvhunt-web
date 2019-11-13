import React, { Component } from "react";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppProvider extends Component {
  state = {
    loginModal: false
  };

  componentDidMount() {}

  updateState = state => {
    this.setState(state);
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AppProvider, Consumer as AppConsumer };

export default AppContext;
