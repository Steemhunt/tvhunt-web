import React, { Component } from "react";
import api from "utils/api";

const SubmitContext = React.createContext();
const { Provider, Consumer } = SubmitContext;

class SubmitProvider extends Component {
  state = {
    step: 3,
    showDrawer: false,
    videoURL: null,
    questions: []
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

export { SubmitProvider, Consumer as SubmitConsumer };

export default SubmitContext;
