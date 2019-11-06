import React, { useRef, useState, useEffect, useContext } from "react";
import SubmitContext from "contexts/SubmitContext";
import { Tag, Input, Tooltip, Icon, Button } from "antd";
import tv from "assets/images/tv@3x.png";
import youtube from "assets/images/youtube.svg";

const TagStep = props => {
  const { step, updateState } = useContext(SubmitContext);
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
        <img src={youtube} alt="" />
        <Input className="input" value="https://www.youtube.com/watch?v=…" />
      </div>

      <div className="add-tags small text">Add tags (up to 3 tags)</div>

      <EditableTags />
      <Button onClick={() => updateState({ step: step + 1 })}>HUNT NOW</Button>
    </div>
  );
};

const EditableTags = props => {
  const input = useRef();
  const [tags, setTags] = useState(["Tag 2", "Tag 3"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClose = removedTag => {
    const newTags = tags.filter(tag => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let newTags = tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      newTags = [...tags, inputValue];
    }
    setTags(newTags);
    setInputVisible(false);
    setInputValue("");
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
            style={{
              background: "#4c4b5e",
              border: "solid 1px #9f9faf",
              color: "#9f9faf",
              marginBottom: 5
            }}
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
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{
            background: "#4c4b5e",
            borderStyle: "dashed",
            color: "#9f9faf",
            cursor: "pointer"
          }}
        >
          <Icon type="plus" /> New Tag
        </Tag>
      )}
    </div>
  );
};

export default TagStep;
