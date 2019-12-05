import React, { Component } from "react";
import { notification } from "antd";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

function validateEmail(email) {
  return email.match(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ //eslint-disable-line
  );
}

class AppProvider extends Component {
  state = {
    loginModal: false
  };

  componentDidMount() {}

  updateState = state => {
    this.setState(state);
  };

  subscribeEmail = async (email, cb) => {
    if (email.length === 0) return;
    else if (!validateEmail(email)) {
      notification["error"]({ message: "Invalid email format" });
      return;
    }

    api
      .post("/email_subscriptions/subscribe.json", { email })
      .then(data => {
        const { is_subscribed } = data;
        if (is_subscribed) {
          notification["success"]({ message: "Subscribed" });
        } else {
          notification["success"]({ message: "Unsubscribed" });
        }
        cb && cb(data);
      })
      .catch(handleErrorMessage);
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          subscribeEmail: this.subscribeEmail
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AppProvider, Consumer as AppConsumer };

export default AppContext;
