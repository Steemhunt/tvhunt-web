import React, { Component } from "react";
import { handleErrorMessage } from "utils/errorMessage";
import { appendToFile } from "utils/blockstackStorage";
import api from "utils/api";
import moment from "moment";

const SubmitContext = React.createContext();
const { Provider, Consumer } = SubmitContext;

function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

const INITIAL_STATE = {
  step: 0,
  showDrawer: false,
  videoURL: "",
  videoId: null,
  videoInfo: {},
  thumbnail: null,
  tags: [],
  submitting: false
};

class SubmitProvider extends Component {
  state = INITIAL_STATE;

  updateState = (state, cb) => {
    this.setState(state, cb);
  };

  submitVideo = async (user, cb) => {
    const { videoId, tags } = this.state;

    api
      .post("/videos", {
        unique_id: videoId,
        tags,
        username: user ? user.username : null
      })
      .then(video => {
        this.updateState({ ...INITIAL_STATE, videoId });
        appendToFile("my_videos.json", {
          slug: video.slug,
          timestamp: moment().utc()
        });
        cb && cb();
      })
      .catch(handleErrorMessage);
  };

  getVideoInfo = async cb => {
    const { videoURL, step } = this.state;
    const videoId = youtubeParser(videoURL);

    if (videoId) {
      this.updateState({ submitting: true });
      await api
        .get("/videos/get_info.json", {
          unique_id: videoId
        })
        .then(videoInfo => {
          console.log("vid info", videoInfo);
          this.setState({
            videoInfo,
            videoId,
            step: step + 1
          });
        })
        .catch(handleErrorMessage)
        .finally(() => {
          this.updateState({ submitting: false }, () => {
            cb && cb();
          });
        });
    } else {
      handleErrorMessage({ message: "Invalid Video URL" });
    }
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
