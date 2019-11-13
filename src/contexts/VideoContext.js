import React, { Component } from "react";
import { withRouter } from "react-router";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";
import { getList, appendToList, removeFromList } from "utils/storage";
import {
  readFile,
  deleteFile,
  appendToFile,
  removeFromFile
} from "utils/blockstackStorage";
import moment from "moment";
import _ from "lodash";

const INITIAL_STATE = {
  tab: "all",
  tabs: [],
  player: null,
  status: null,
  playlist: [],
  currentIndex: 0,
  currentVideo: null,
  currentTime: 0,
  duration: 0,
  volume: 0,
  fullscreen: false
};

const VideoContext = React.createContext(INITIAL_STATE);
const { Provider, Consumer } = VideoContext;

class VideoProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: INITIAL_STATE,
      loadVideos: this.loadVideos,
      loadVideo: this.loadVideo,
      prev: this.prev,
      next: this.next,
      updateState: this.updateState,
      updateCurrentVideo: this.updateCurrentVideo,
      getVideoInfo: this.getVideoInfo,
      likeUnlike: this.likeUnlike,
      loadMyUploads: this.loadMyUploads
    };
  }

  componentDidMount() {
    // deleteFile("my_videos.json");
  }

  updateState = newState => {
    this.setState({ value: { ...this.state.value, ...newState } });
  };

  getVideoInfo = () => {};

  loadMyUploads = async () => {
    const videos = await readFile("my_videos.json");
    const slugs = videos.join(",");
    api
      .get(`/videos?slugs=${slugs}.json`)
      .then(({ total_count, videos }) => this.populateList(videos))
      .catch(handleErrorMessage);
  };

  loadVideos = (topic, slug) => {
    api
      .get("/videos.json")
      .then(({ total_count, videos }) => this.populateList(videos, topic, slug))
      .catch(handleErrorMessage);
  };

  populateList = (videos, topic, slug) => {
    const tabs = Object.entries(
      _.countBy(videos.reduce((acc, video) => acc.concat(video.tags), []))
    ).sort((a, b) => b[1] - a[1]);

    let currentVideo = null;
    let tab = "all";

    if (topic && slug) {
      currentVideo = _.find(videos, ["slug", slug]);
      tab = topic;
    } else {
      currentVideo = videos[0];
    }

    if (this.props.history.location.pathname === "/") {
      this.props.history.push(`${tab}/${currentVideo.slug}`);
    }

    this.updateState({
      playlist: videos,
      currentVideo,
      tabs,
      tab
    });
  };

  updateCurrentVideo = (topic, slug) => {
    const { playlist, currentVideo } = this.state.value;
    const foundVideo = _.find(playlist, ["slug", slug]);
    if (foundVideo && !_.isEqual(foundVideo, currentVideo)) {
      this.updateState({ currentVideo: foundVideo });
    }
  };

  updateTags = (id, tags) => {
    api
      .patch(`/vides/${id}.json`)
      .then(result => {})
      .catch(handleErrorMessage);
  };

  likeUnlike = ({ id }) => {
    const { playlist } = this.state.value;
    const likedList = getList("liked");
    let method = likedList.includes(id) ? "unlike" : "like";

    api
      .patch(`/videos/${id}/${method}.json`)
      .then(({ success, vote_count }) => {
        if (method === "like") {
          appendToList("liked", id);
          appendToFile("votes.json", { id, timestamp: moment().utc() });
        } else {
          removeFromList("liked", id);
          removeFromFile("votes.json", { id });
        }
        const clonedPlaylist = _.clone(playlist);
        const video = _.find(clonedPlaylist, ["id", id]);
        if (video) {
          video.vote_count = vote_count;
        }
        this.updateState({ playlist: clonedPlaylist });
      })
      .catch(e => {
        handleErrorMessage(e);
      });
  };

  prev = () => {
    const { currentIndex, playlist } = this.state.value;
    let prevIndex = (currentIndex - 1) % playlist.length;
    if (prevIndex < 0) prevIndex += playlist.length;
    this.updateState({
      currentIndex: prevIndex,
      currentVideo: playlist[prevIndex]
    });
  };

  next = () => {
    const { currentIndex, playlist } = this.state.value;
    const nextIndex = (currentIndex + 1) % playlist.length;
    this.updateState({
      currentIndex: nextIndex,
      currentVideo: playlist[nextIndex]
    });
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const videoWithRouter = withRouter(VideoProvider);

export { videoWithRouter as VideoProvider, Consumer as VideoConsumer };

export default VideoContext;
