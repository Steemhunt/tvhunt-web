import React, { Component } from "react";
import { withRouter } from "react-router";
import api from "utils/api";
import { handleErrorMessage } from "utils/errorMessage";
import { getList, appendToList, removeFromList } from "utils/storage";
import {
  readFile,
  appendToFile,
  removeFromFile
} from "utils/blockstackStorage";
import { UserSession, AppConfig } from "blockstack";
import isMobile from "ismobilejs";
import _ from "lodash";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export const MODE_TV = "MODE_TV";
export const MODE_UPLOADED = "MODE_UPLOADED";
export const MODE_VOTED = "MODE_VOTED";
const INITIAL_STATE = {
  mode: MODE_TV,
  tab: "all",
  tabs: [],
  player: null,
  status: null,
  playlist: [],
  liked: [],
  currentIndex: 0,
  currentVideo: null,
  currentTime: 0,
  duration: 0,
  volume: 0,
  fullscreen: false,
  hover: false
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
      loadMyUploads: this.loadMyUploads,
      loadMyVotes: this.loadMyVotes,
      loading: false
    };
  }

  componentDidMount() {
    this.refreshLikes();
  }

  async refreshLikes() {
    let liked = getList("liked");
    if (!liked) liked = [];

    this.updateState({ liked });

    if (userSession.isUserSignedIn()) {
      const gaiaLiked = await readFile("votes.json");
      if (gaiaLiked) liked.concat(gaiaLiked);
      this.updateState({ liked });
    }
  }

  updateState = newState => {
    this.setState({ value: { ...this.state.value, ...newState } });
  };

  getVideoInfo = () => {};

  loadMyUploads = async () => {
    this.updateState({ mode: MODE_UPLOADED, loading: true });
    const videos = await readFile("my_videos.json");
    if (!videos) {
      this.populateList([]);
      this.updateState({ loading: false });
      return;
    }
    const slugs = videos.join(",");
    api
      .get("/videos.json", { slugs })
      .then(({ total_count, videos }) => this.populateList(videos))
      .catch(handleErrorMessage)
      .finally(() => this.updateState({ loading: false }));
  };

  loadMyVotes = async () => {
    this.updateState({ mode: MODE_VOTED, loading: true });
    const videos = await readFile("votes.json");
    const slugs = videos.join(",");
    api
      .get("/videos.json", { slugs })
      .then(({ total_count, videos }) => this.populateList(videos))
      .catch(handleErrorMessage)
      .finally(() => this.updateState({ loading: false }));
  };

  loadVideos = (topic, slug) => {
    this.updateState({ loading: true });
    api
      .get("/videos.json", { days_ago: 2 })
      .then(({ total_count, videos }) => this.populateList(videos, topic, slug))
      .catch(handleErrorMessage)
      .finally(() => this.updateState({ loading: false }));
  };

  populateList = (videos, topic, slug) => {
    const tabs = Object.entries(
      _.countBy(videos.reduce((acc, video) => acc.concat(video.tags), []))
    ).sort((a, b) => b[1] - a[1]);

    if (isMobile().phone) {
      this.updateState({
        playlist: videos,
        tabs,
        tab: "all"
      });
    } else {
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
    }
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

  likeUnlike = ({ id, slug }, cb) => {
    const { playlist } = this.state.value;
    const likedList = getList("liked");
    let method = likedList && likedList.includes(slug) ? "unlike" : "like";

    api
      .patch(`/videos/${id}/${method}.json`)
      .then(({ success, vote_count }) => {
        if (method === "like") {
          appendToList("liked", slug);
          appendToFile("votes.json", slug, {}, () => this.refreshLikes());
        } else {
          removeFromList("liked", slug);
          removeFromFile("votes.json", slug, {}, () => this.refreshLikes());
        }
        const clonedPlaylist = _.clone(playlist);
        const video = _.find(clonedPlaylist, ["id", id]);
        if (video) {
          video.vote_count = vote_count;
        }
        this.updateState({ playlist: clonedPlaylist });
        this.refreshLikes();
      })
      .catch(e => {
        handleErrorMessage(e);
      })
      .finally(cb && cb());
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
