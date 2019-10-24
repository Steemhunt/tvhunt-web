import React, { Component } from "react";
import api from "utils/api";

const HomeContext = React.createContext();
const { Provider, Consumer } = HomeContext;

class HomeProvider extends Component {
  state = {
  };

  componentDidMount() {}


  updateState = obj => {
    this.setState(obj);
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { HomeProvider, Consumer as AppConsumer };

export default HomeContext;
