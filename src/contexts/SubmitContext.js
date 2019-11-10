import React, { Component } from "react";
import AppContext from "contexts/AppContext";
import VideoContext from "contexts/VideoContext";
import { handleErrorMessage } from "utils/errorMessage";
import api from "utils/api";

const SubmitContext = React.createContext();
const { Provider, Consumer } = SubmitContext;

function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

class SubmitProvider extends Component {
  state = {
    step: 0,
    showDrawer: false,
    videoURL: "https://www.youtube.com/watch?v=vwUzK4bCBZI",
    videoId: null,
    videoInfo: {},
    thumbnail: null,
    tags: [],
    submitting: false
  };

  updateState = state => {
    this.setState(state);
  };

  submitVideo = async () => {
    const { videoId, tags } = this.state;
    await api
      .post("/videos", {
        unique_id: videoId,
        tags
      })
      .then(videos => {})
      .catch(handleErrorMessage);
  };

  getVideoInfo = async () => {
    const { videoURL, step } = this.state;
    const videoId = youtubeParser(videoURL);

    try {
      if (videoId) {
        this.updateState({submitting: true});
        const resp = await fetch(
          `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${videoId}&format=json`
        );
        const videoInfo = await resp.json();
        console.log("vid info", videoId);
        this.setState({ videoInfo, videoId, step: step + 1 });
      } else {
        handleErrorMessage({ message: "Invalid Video URL" });
      }
    } catch (e) {}
  };
  render() {
    return (
      <Provider
        value={{
          ...this.state,
          updateState: this.updateState,
          submitVideo: this.submitVideo,
          getVideoInfo: this.getVideoInfo
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { SubmitProvider, Consumer as SubmitConsumer };
export default SubmitContext;
