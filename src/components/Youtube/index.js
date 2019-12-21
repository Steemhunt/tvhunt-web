import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import VideoContext from 'contexts/VideoContext';
import SubmitContext from 'contexts/SubmitContext';
import VideoInformation from './VideoInformation';
import Video from './Video';
import TvNoise from './TvNoise.js';
import Controls from './Controls';
import TapToUnmute from './TapToUnmute';
import HoverControls from './HoverControls';
import Header from 'components/Header';
import { STATUS_BUFFERING } from './Video';

const Youtube = props => {
  const { value, updateState } = useContext(VideoContext);
  const { videoId } = useContext(SubmitContext);
  const { hover, fullscreen, status, currentVideo } = value;

  useEffect(() => {
    const h = hover && setTimeout(() => updateState({ hover: false }), 3600);
    return () => h && clearTimeout(h);
  }, [hover]); //eslint-disable-line

  const shouldFade = (videoId || currentVideo) && status !== STATUS_BUFFERING;

  return (
    <div
      className={`youtube-container no-select ${fullscreen && 'fullscreen'}`}
      onMouseMove={() => updateState({ hover: true })}
      onMouseLeave={() => updateState({ hover: false })}
    >
      <Header />
      <div className="video-container">
        <Video />

        <div className={`noise-parent-container ${shouldFade && 'fade-out'}`}>
          <TvNoise />
        </div>
      </div>
      <Controls />
      <HoverControls />
      <VideoInformation />
      <TapToUnmute />
    </div>
  );
};

export default withRouter(Youtube);
