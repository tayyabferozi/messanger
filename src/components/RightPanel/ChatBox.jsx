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
    <form
      onSubmit={inputSubmitHandler}
      className="py-6 px-4 bg-[#2c302e] flex items-center relative gap-3 sm:gap-4"
    >
      <div
        className={clsx(
          "absolute bg-[#2c302e] left-0 top-0 -translate-y-full w-full opacity-0 transition-all z-10 pt-4 px-4 border-b border-solid border-[#383d3b]",
          (selectedFiles.length > 0 || replyingTo) && "!opacity-100"
        )}
      >
        {replyingTo && (
          <div>
            <p className="flex justify-between items-center relative">
              <em>Replying To...</em>
              <div
                className="absolut right-2 top-1/2 -translate-y-1/2 text-[28px] text-red-600 cursor-pointer"
                onClick={() => setReplyingTo("")}
              >
                &times;
              </div>
            </p>
            <div className="rounded-2 py-3 px-4 mb-4 border border-solid border-l-[3px] border-[#5156be] font-bold text-white mt-2 overflow-auto mh-[100px] text-left">
              {replyingTo}
            </div>
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="grid gap-1 overflow-auto max-h-[150px] mb-4 text-[13px] grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {selectedFiles.map((el, idx) => {
              let isImg = false;
              if (el?.type?.startsWith("image")) {
                isImg = true;
              }
              return (
                <div
                  key={"dropped-file-" + idx}
                  className="bg-[rgba(49,53,51,1)] border border-solid border-[#383d3b] rounded-lg p-2 flex items-center gap-2 text-white h-10 relative"
                >
                  <img
                    className={clsx("w-4", isImg && "invert")}
                    src={isImg ? AttachImage : FileIcon}
                    alt="file"
                  />
                  <p>
                    {el.name.slice(0, 16)} {el.name.length > 16 ? "..." : ""}
                  </p>
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[28px] text-red-600 cursor-pointer"
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
        className="bg-transparent border border-solid border-[#383d3b] bg-[#363a38] w-full rounded-[4px] outline-none px-4 py-2 resize-none text-white text-base max-h-24"
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
        className="hidden"
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
        className="hidden"
        id="fileInput"
        type="file"
        onChange={(e) => {
          setSelectedFiles((prev) => {
            const newState = cloneDeep(prev);
            return [...newState, ...e.target.files];
          });
        }}
      />
      <label className="flex items-center" htmlFor="imgInput">
        <img
          className="cursor-pointer invert transition-all h-5 sm:h-[30px] hover:scale-105"
          src={AttachImage}
          alt="Attach"
        />
      </label>
      <label className="flex items-center" htmlFor="fileInput">
        <img
          className="cursor-pointer invert transition-all h-5 sm:h-[30px] hover:scale-105"
          src={AttachFile}
          alt="Attach File"
        />
      </label>
      <div className="relative flex items-center z-10">
        <img
          onClick={() => setIsPickerActive(!isPickerActive)}
          className="w-5 sm:w-[30px] cursor-pointer transition-all hover:scale-105"
          src={Happiness}
          alt="happiness"
        />
        <div
          className={clsx(
            "absolute bottom-[60px] -right-[60px] sm:right-0 opacity-0 transition-all h-0 overflow-hidden",
            isPickerActive && "!h-[450px] !opacity-100 !transition-all"
          )}
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
      <button className="w-10 sm:w-[60px] h-10 sm:h-[60px] flex-shrink-0 bg-[#5156be] border-transparent rounded-[4px] flex justify-center items-center cursor-pointer transition-all hover:scale-105">
        <SendIcon className="text-white w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatBox;
