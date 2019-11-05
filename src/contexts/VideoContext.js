import React, { Component } from "react";
import api from "utils/api";

const VideoContext = React.createContext();
const { Provider, Consumer } = VideoContext;

class VideoProvider extends Component {
  state = {
    player: null,
    status: null,
    playlist: ["FTS5bdW7ykc", "vWUHoAGRTHU", "Yf6rUhPxj70", "iMAKYI4RJsY"],
    currentIndex: 1,
    currentTime: 0,
    duration: 0,
    volume: 0,
    fullscreen: false
  };

  componentDidMount() {}

  updateState = state => {
    this.setState(state);
  };

  prev = () => {
    const { currentIndex, playlist } = this.state;
    let prevIndex = (currentIndex - 1) % playlist.length;
    if (prevIndex < 0) prevIndex += playlist.length;
    this.setState({ currentIndex: prevIndex });
  };

  next = () => {
    const { currentIndex, playlist } = this.state;
    this.setState({ currentIndex: (currentIndex + 1) % playlist.length });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          prev: this.prev,
          next: this.next
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { VideoProvider, Consumer as VideoConsumer };

export default VideoContext;
