import React, { useRef, useEffect, useState } from "react";
import { Tag, Input, Tooltip, Icon } from "antd";
import PropTypes from "prop-types";

const CreateQuizForm = props => {
  const inputRef = useRef();
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    if (inputVisible) {
      console.log(inputRef.current);
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const handleClose = removedTag => {
    const tags = answers.filter(tag => tag !== removedTag);
    setAnswers(tags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let _answers = [];
    if (inputValue && answers.indexOf(inputValue) === -1) {
      _answers = [...answers, inputValue];
    }

    setAnswers(_answers);
    setInputVisible(false);
    setInputValue("");
  };

  return (
    <div>
      <Input placeholder="Question" style={{ margin: "20px 0 10px" }} />
      {answers.map((tag, index) => {
        const isLongTag = tag.length > 20;
        const tagElem = (
          <Tag
            key={tag}
            color="#3e1bce"
            closable={true}
            onClose={() => handleClose(tag)}
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
          ref={inputRef}
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
          style={{ background: "#fff", borderStyle: "dashed" }}
        >
          <Icon type="plus" /> New Answer
        </Tag>
      )}
    </div>
  );
};

CreateQuizForm.propTypes = {};

CreateQuizForm.defaultProps = {};

export default CreateQuizForm;
