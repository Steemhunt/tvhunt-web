import React, { Component } from 'react';
import { notification } from 'antd';
import { withRouter } from 'react-router';
import api from 'utils/api';
import { handleErrorMessage } from 'utils/errorMessage';
import { getList, appendToList, removeFromList } from 'utils/storage';
import { readFile, appendToFile, removeFromFile } from 'utils/blockstackStorage';
import { UserSession, AppConfig } from 'blockstack';
import isMobile from 'ismobilejs';
import _ from 'lodash';
import moment from 'moment';

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export const MODE_TV = 'MODE_TV';
export const MODE_UPLOADED = 'MODE_UPLOADED';
export const MODE_VOTED = 'MODE_VOTED';
export const MODE_TAG = 'MODE_TAG';

const INITIAL_STATE = {
  mode: MODE_TV,
  tab: 'all',
  tabs: [],
  player: null,
  status: null,
  totalCountMap: {},
  daysPlaylist: {},
  playlist: [],
  liked: [],
  flagged: [],
  votes: [],
  uploads: [],
  tags: [],
  currentIndex: 0,
  currentVideo: null,
  currentTime: 0,
  duration: 0,
  volume: 0,
  fullscreen: false,
  borderlessFullscreen: false,
  hover: false,
  loading: false,
  lastDayLoaded: 0,
  endOfList: false,
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
      setCurrentVideo: this.setCurrentVideo,
      destroyPlayer: this.destroyPlayer,
      loadVideosByTag: this.loadVideosByTag,
      infiniteLoad: _.debounce(this.infiniteLoad, 300),
      flagUnflag: this.flagUnflag,
      incrementViewCount: this.incrementViewCount,
    };
  }

  componentDidMount() {
    this.refreshLikes();
  }

  updateCurrentVideo = (topic, slug) => {
    const { playlist, currentVideo } = this.state.value;
    const foundVideo = _.find(playlist, ['slug', slug]);
    if (foundVideo && !_.isEqual(foundVideo, currentVideo)) {
      this.updateState({ currentVideo: foundVideo });
      this.incrementViewCount(foundVideo.slug);
    } else if (slug) {
      api
        .get(`/videos/${slug}.json`)
        .then(currentVideo => this.updateState({ currentVideo }))
        .catch(handleErrorMessage);
    }
  };

  destroyPlayer = () => {
    console.log('destroying player');
    const { player } = this.state.value;
    player.destroy();
    this.updateState({
      player: null,
      currentVideo: null,
      status: null,
      currentTime: null,
    });
  };

  async refreshLikes() {
    let liked = getList('liked');
    let flagged = getList('flagged');
    if (!liked) liked = [];
    if (!flagged) flagged = [];

    this.updateState({ liked, flagged });

    console.log('liked', liked);

    if (userSession.isUserSignedIn()) {
      const gaiaLiked = await readFile('votes.json');
      const gaiaFlagged = await readFile('flagged.json');
      if (gaiaLiked) liked.concat(gaiaLiked);
      if (gaiaFlagged) flagged.concat(gaiaFlagged);
      console.log('liked', liked);
      this.updateState({ liked, flagged });
    }
  }

  updateState = (newState, cb) => {
    this.setState({ value: { ...this.state.value, ...newState } }, cb);
  };

  getVideoInfo = () => {};

  loadVideosByTag = (tags, slug) => {
    this.updateState({ loading: true, mode: MODE_TAG });
    api
      .get('/videos.json', { tags })
      .then(({ total_count, videos }) => {
        this.updateState({
          playlist: videos,
          loading: false,
          tags: videos,
          currentVideo: slug ? _.find(videos, ['slug', slug]) : videos[0],
        });
      })
      .catch(handleErrorMessage);
  };

  loadMyUploads = async () => {
    this.props.history.push('/uploads');
    this.updateState({ mode: MODE_UPLOADED, loading: true, uploads: [] });
    const videos = await readFile('my_videos.json');
    if (!videos) {
      this.populateList([]);
      this.updateState({ loading: false });
      return;
    }
    const slugs = videos.map(({ slug }) => slug).join(',');
    console.log('slugs', slugs);

    if (!slugs) {
      this.updateState({
        loading: false,
        uploads: [],
      });
    } else {
      api
        .get('/videos.json', { slugs })
        .then(({ total_count, videos }) =>
          this.updateState({
            loading: false,
            uploads: videos,
          }),
        )
        .catch(handleErrorMessage);
    }
  };

  loadMyVotes = async () => {
    this.props.history.push('/votes');
    this.updateState({ mode: MODE_VOTED, loading: true, votes: [] });
    const vids = await readFile('votes.json');
    const slugs = vids.map(({ slug }) => slug).join(',');
    console.log('slugs', slugs);
    if (!slugs) {
      this.updateState({
        loading: false,
        votes: [],
      });
    } else {
      api
        .get('/videos.json', { slugs })
        .then(({ total_count, videos }) =>
          this.updateState({
            loading: false,
            votes: videos,
          }),
        )
        .catch(handleErrorMessage);
    }
  };

  infiniteLoad = async (daysAgo, daysToLoad, callback) => {
    console.log("infinite load called");
    const { loading, endOfList, totalCountMap } = this.state.value;
    if (loading || endOfList) return;
    this.updateState({ loading: true, lastDayLoaded: daysAgo });
    let i = 0;

    const clonedTotalCountMap = _.clone(totalCountMap);
    const call = async (days_ago, cb) => {
      const { videos, total_count } = await api.get('/videos.json', {
        days_ago,
        top: true,
      });

      clonedTotalCountMap[days_ago] = total_count;

      if (i >= 5 || (daysToLoad && i === daysToLoad)) {
        this.updateState({ endOfList: true }, () => {
          callback && callback();
        });
        return;
      } else if (daysToLoad && days_ago > daysAgo + daysToLoad) {
        callback && callback();
        return;
      } else if (total_count === 0) {
        i++;
      } else {
        i = 0;
      }

      this.updateState({ totalCountMap: clonedTotalCountMap }, () => {
        this.populateList(videos, null, null, days_ago, () => {
          call(days_ago + 1);
        });
      });
    };

    await call(daysAgo);
  };

  loadVideo = async slug => {
    if (!slug) return;

    let result = null;
    try {
      result = await api.get(`/videos/${slug}.json`, {});
    } catch (e) {
      handleErrorMessage(e);
    }

    console.log('result', result);

    return result;
  };

  loadVideos = (topic, slug, days_ago = 0, top = false, cb) => {
    const { daysPlaylist, totalCountMap } = this.state.value;
    this.updateState({ loading: true, lastDayLoaded: days_ago });
    api
      .get('/videos.json', { days_ago, top })
      .then(({ total_count, videos }) => {
        if (daysPlaylist[days_ago] && daysPlaylist[days_ago].length === total_count) {
          cb && cb({ success: false });
        } else {
          const clonedTotalCountMap = _.clone(totalCountMap);
          clonedTotalCountMap[days_ago] = total_count;
          this.updateState({ totalCountMap: clonedTotalCountMap }, () => {
            this.populateList(videos, topic, slug, days_ago, cb);
          });
        }

        this.updateState({ loading: false });
      })
      .catch(handleErrorMessage);
  };

  populateList = async (videos, topic, slug, days_ago, cb) => {
    const { playlist, daysPlaylist, currentVideo: curr } = this.state.value;

    let currentVideo = curr;
    let tab = topic || 'all';

    if (slug) {
      currentVideo = _.find(videos, ['slug', slug]);
    } else {
      if (!isMobile().phone && !curr) {
        currentVideo = videos.filter(v => {
          if (tab === 'all') return true;
          return v.tags.includes(tab);
        })[0];
      }
    }

    const clonedDaysPlaylist = _.clone(daysPlaylist);
    if (!clonedDaysPlaylist[days_ago]) clonedDaysPlaylist[days_ago] = [];
    clonedDaysPlaylist[days_ago] = _.uniqBy(clonedDaysPlaylist[days_ago].concat(videos), 'slug');

    if (!currentVideo) {
      currentVideo = await this.loadVideo(slug);
    }

    const newPlaylist = _.uniqBy(playlist.concat(videos), 'slug');

    this.updateState(
      {
        daysPlaylist: clonedDaysPlaylist,
        playlist: newPlaylist,
        currentVideo,
        fullscreen: isMobile().phone && currentVideo,
        tab,
        loading: false,
        lastDayLoaded: days_ago,
      },
      () => {
        cb && cb({ success: true, playlist: newPlaylist });
      },
    );
  };

  setCurrentVideo = (topic, data) => {
    const { playlist } = this.state.value;
    this.updateState({
      currentVideo: data,
      currentIndex: _.findIndex(playlist, { slug: data.slug }),
      fullscreen: isMobile().phone,
    });
    this.props.history.push(`/${data.tags[0]}/${data.slug}`);
  };

  updateTags = (id, tags) => {
    api
      .patch(`/vides/${id}.json`)
      .then(result => {})
      .catch(handleErrorMessage);
  };

  likeUnlike = (data, cb) => {
    const { id, slug } = data;
    const { playlist, liked, tags, uploads, votes, mode } = this.state.value;
    let method = liked && _.find(liked, ['slug', slug]) !== undefined ? 'unlike' : 'like';

    api
      .patch(`/videos/${id}/${method}.json`)
      .then(({ success, vote_count }) => {
        let likeData = { slug, timestamp: moment().utc() };
        if (method === 'like') {
          appendToList('liked', likeData);
          appendToFile('votes.json', likeData, {}, () => this.refreshLikes());
        } else {
          removeFromList('liked', slug);
          removeFromFile('votes.json', slug, {}, () => this.refreshLikes());
        }

        let key = 'playlist';
        let clonedPlaylist = [];
        let video = null;

        if (mode === MODE_UPLOADED) {
          key = 'uploads';
          clonedPlaylist = _.clone(uploads);
          video = _.find(clonedPlaylist, ['id', id]);
        } else if (mode === MODE_VOTED) {
          key = 'votes';
          clonedPlaylist = _.clone(votes);
          video = _.find(clonedPlaylist, ['id', id]);
        } else if (mode === MODE_TAG) {
          key = 'tags';
          clonedPlaylist = _.clone(tags);
          video = _.find(clonedPlaylist, ['id', id]);
        } else {
          clonedPlaylist = _.clone(playlist);
          video = _.find(clonedPlaylist, ['id', id]);
        }

        if (video) {
          video.vote_count = vote_count;
        }
        this.updateState({ [key]: clonedPlaylist });
        this.refreshLikes();
      })
      .catch(e => {
        handleErrorMessage(e);
      })
      .then(cb && cb());
  };

  prev = () => {
    const { currentIndex, playlist } = this.state.value;
    let prevIndex = (currentIndex - 1) % playlist.length;
    if (prevIndex < 0) prevIndex += playlist.length;
    this.updateState({
      currentIndex: prevIndex,
      currentVideo: playlist[prevIndex],
    });
  };

  next = () => {
    const { currentIndex, playlist, lastDayLoaded, mode } = this.state.value;

    const nextIndex = currentIndex + 1;
    console.log(playlist.length, nextIndex);
    if (nextIndex > playlist.length - 1 && mode === MODE_TV) {
      this.loadVideos(null, null, lastDayLoaded + 1, true, ({ playlist: newPlaylist }) => {
        this.updateState({
          currentIndex: nextIndex,
          currentVideo: newPlaylist[nextIndex],
        });
      });
    } else {
      this.updateState({
        currentIndex: nextIndex,
        currentVideo: playlist[nextIndex],
      });
    }
  };

  flagUnflag = (videoId, user) => {
    const username = user ? user.username : null;
    const { flagged } = this.state.value;
    let method = flagged && _.find(flagged, ['id', videoId]) !== undefined ? 'unflag' : 'flag';
    api
      .patch(`/videos/${videoId}/${method}.json`, { username })
      .then(({ success }) => {
        if (success) {
          notification['success']({
            message: `Successfully ${method}ged video.`,
          });
          let flagData = { id: videoId, timestamp: moment().utc() };
          if (method === 'flag') {
            appendToList('flagged', flagData);
            appendToFile('flagged.json', flagData, {}, () => this.refreshLikes());
          } else {
            removeFromList('flagged', videoId);
            removeFromFile('flagged.json', videoId, {}, () => this.refreshLikes());
          }
          this.updateState({ flagged: getList('flagged') }); // Update states with the safeStorage data
        }
      })
      .catch(handleErrorMessage);
  };

  incrementViewCount = slug => {
    api
      .get(`/videos/${slug}.json`)
      .then()
      .catch(handleErrorMessage);
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const videoWithRouter = withRouter(VideoProvider);

export { videoWithRouter as VideoProvider, Consumer as VideoConsumer };

export default VideoContext;
