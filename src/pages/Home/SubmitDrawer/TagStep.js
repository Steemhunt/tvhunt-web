import React, { useRef, useState, useEffect, useContext } from "react";
import SubmitContext from "contexts/SubmitContext";
import AuthContext from "contexts/AuthContext";
import { Tag, Input, Tooltip, Icon, Button } from "antd";
import tv from "assets/images/tv@3x.png";

const TagStep = props => {
  const { submitVideo, videoURL, videoId } = useContext(SubmitContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="step-submit">
      <div className="title big">SUBMIT VIDEO</div>
      <img className="dog-img" src={tv} alt="" />
      <div className="desc text">
        TV Hunt is a daily top chart for videos. You can simply share a cool
        video that you’ve found today. The daily ranking is based on the
        upvotes.
      </div>

      <div className="input-desc text-white">Wanting to share</div>
      <div className="input-container tag-step">
        <img
          className="thumbnail"
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt=""
        />
        <div className="input overflow-ellipsis">{videoURL}</div>
      </div>

      <div className="add-tags small text">Add tags (up to 3 tags)</div>

      <EditableTags />
      <Button onClick={() => submitVideo(user)}>HUNT NOW</Button>
    </div>
  );
};

const EditableTags = props => {
  const input = useRef();
  const { tags, unique_id, updateState } = useContext(SubmitContext);
  const [inputVisible, setInputVisible] = useState(false);

  const handleClose = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    updateState({ tags: newTags });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    updateState({ unique_id: e.target.value });
  };

  const handleInputConfirm = () => {
    let newTags = tags;
    if (unique_id && tags.indexOf(unique_id) === -1) {
      newTags = [...tags, unique_id];
    }
    updateState({ tags: newTags });
    setInputVisible(false);
    updateState({ unique_id: "" });
  };

  useEffect(() => {
    if (inputVisible) input.current.focus();
  }, [inputVisible]);

  return (
    <div className="tags">
      {tags.map((tag, index) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            onClose={() => handleClose(tag)}
            closable={true}
            className="tag"
          >
            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={input}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={unique_id}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && tags.length < 3 && (
        <Tag onClick={showInput} className="tag">
          <Icon type="plus" /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default TagStep;
