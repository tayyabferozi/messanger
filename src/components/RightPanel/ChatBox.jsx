import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import TextareaAutosize from "react-textarea-autosize";
import clsx from "clsx";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import Happiness from "../../assets/happiness.png";
import AttachFile from "../../assets/attach-file.png";
import { ReactComponent as SendIcon } from "../../assets/send.svg";
import AttachImage from "../../assets/attach-image.png";
import FileIcon from "../../assets/file-solid.svg";
import classes from "./RightPanel.module.scss";
import cloneDeep from "clone-deep";

const ChatBox = ({
  chatId,
  selectedFiles,
  setSelectedFiles,
  replyingTo,
  setReplyingTo,
  addMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isPickerActive, setIsPickerActive] = useState(false);
  const pickerRef = useRef();

  const inputSubmitHandler = (e) => {
    e.preventDefault();

    addMessage(chatId, {
      timestamp: new Date().getTime(),
      text: inputValue,
      attachments: cloneDeep(selectedFiles),
      inReplyTo: replyingTo,
    });
    setInputValue("");
    setReplyingTo("");
    setSelectedFiles([]);
  };

  useOnClickOutside(pickerRef, () => {
    setIsPickerActive(false);
  });

  return (
    <form onSubmit={inputSubmitHandler} className={classes.chatbox}>
      <div
        className={clsx(
          classes.additionalMessage,
          (selectedFiles.length > 0 || replyingTo) && classes.active
        )}
      >
        {replyingTo && (
          <div>
            <p className={classes.replyingToTitle}>
              <em>Replying To...</em>
              <div className={classes.delete} onClick={() => setReplyingTo("")}>
                &times;
              </div>
            </p>
            <div className={classes.replyingTo}>{replyingTo}</div>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className={classes.droppedFiles}>
            {selectedFiles.map((el, idx) => {
              let isImg = false;
              if (el?.type?.startsWith("image")) {
                isImg = true;
              }
              return (
                <div
                  key={"dropped-file-" + idx}
                  className={classes.droppedFile}
                >
                  <img
                    className={clsx(isImg && classes.invert)}
                    src={isImg ? AttachImage : FileIcon}
                    alt="file"
                  />
                  <p>
                    {el.name.slice(0, 16)} {el.name.length > 16 ? "..." : ""}
                  </p>
                  <div
                    className={classes.delete}
                    onClick={() =>
                      setSelectedFiles((prev) => {
                        const newState = cloneDeep(prev);
                        newState.splice(idx, 1);
                        return newState;
                      })
                    }
                  >
                    &times;
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <TextareaAutosize
        className={classes.input}
        type="text"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        minRows={2}
        placeholder="Type your message here..."
      />
      <input
        multiple
        className={classes.imgInput}
        id="imgInput"
        type="file"
        accept="image/*"
        onChange={(e) => {
          setSelectedFiles((prev) => {
            const newState = cloneDeep(prev);
            return [...newState, ...e.target.files];
          });
        }}
      />
      <input
        multiple
        className={classes.imgInput}
        id="fileInput"
        type="file"
        onChange={(e) => {
          setSelectedFiles((prev) => {
            const newState = cloneDeep(prev);
            return [...newState, ...e.target.files];
          });
        }}
      />
      <label htmlFor="imgInput">
        <img className={classes.attachImage} src={AttachImage} alt="Attach" />
      </label>
      <label htmlFor="fileInput">
        <img
          className={classes.attachFile}
          src={AttachFile}
          alt="Attach File"
        />
      </label>
      <div className={classes.emojiPicker}>
        <img
          onClick={() => setIsPickerActive(!isPickerActive)}
          className={classes.happiness}
          src={Happiness}
          alt="happiness"
        />
        <div
          className={clsx(classes.pickerBox, isPickerActive && classes.active)}
          ref={pickerRef}
        >
          <EmojiPicker
            emojiStyle="google"
            theme="dark"
            onEmojiClick={(e) => {
              console.log(e);
              setInputValue((val) => val + e.emoji);
            }}
          />
        </div>
      </div>
      <button className={classes.btn}>
        <SendIcon />
      </button>
    </form>
  );
};

export default ChatBox;
