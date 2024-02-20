import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import cloneDeep from "clone-deep";
import clsx from "clsx";

import ChatBox from "./ChatBox";
import Message from "./Message";
import GroupFill from "../../assets/group.png";
import { ReactComponent as MessageIcon } from "../../assets/message.svg";

const RightPanel = ({
  myUserName,
  chatList = [],
  selectedChatId,
  addMessage,
  addReaction,
  removeReaction,
}) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isDragEntered, setIsDragEntered] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [replyingTo, setReplyingTo] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    noClick: true,
    multiple: true,
    onDragEnter: (e) => {
      setIsDragEntered(true);
    },
    onDragLeave: (e) => {
      setIsDragEntered(false);
    },
    onDrop: (e) => {
      setSelectedFiles((prev) => {
        const newState = cloneDeep(prev);

        return [...newState, ...e];
      });
    },
  });

  useEffect(() => {
    const idx = chatList.findIndex((el) => el.id === selectedChatId);
    const selectedChat = chatList[idx];
    setSelectedChat(selectedChat);
  }, [chatList, selectedChatId]);

  useEffect(() => {
    const ev = document.addEventListener("mousemove", (e) => {
      if (e.buttons === 0) setIsDragEntered(false);
    });

    return () => document.removeEventListener("mousemove", ev);
  }, []);

  return (
    <div className="flex-grow relative" {...getRootProps()}>
      <div
        className={clsx(
          "absolute left-0 top-0 w-full h-full pointer-events-none flex justify-center items-center text-5xl font-bold opacity-0 transition-all bg-[rgba(49,53,51,.75)] z-10",
          isDragEntered && "!pointer-events-auto !opacity-100"
        )}
      >
        Drop your file/s
      </div>
      <input {...getInputProps()} />
      {selectedChat ? (
        <div className="h-screen flex flex-col">
          <div className="py-6 px-4 flex items-center gap-4 bg-[#2c302e]">
            <div className="w-12 h-12 rounded-full overflow-hidden relative">
              <img
                className={clsx(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full",
                  selectedChat?.isGroup &&
                    !selectedChat?.img &&
                    "invert border border-solid border-[#383d3b] rounded-full"
                )}
                src={
                  selectedChat?.isGroup
                    ? selectedChat?.img || GroupFill
                    : selectedChat?.img
                }
                alt={selectedChat?.name}
              />
            </div>
            <div className="text-xl font-medium">{selectedChat?.name}</div>
          </div>
          <div className="overflow-x-hidden overflow-y-auto p-4 flex-grow">
            {selectedChat.messages.map((el, idx) => {
              return (
                <Message
                  key={selectedChatId + "-chat-message-" + idx}
                  el={el}
                  selectedChat={selectedChat}
                  idx={idx}
                  myUserName={myUserName}
                  setReplyingTo={setReplyingTo}
                  addReaction={addReaction}
                  removeReaction={removeReaction}
                />
              );
            })}
          </div>
          <ChatBox
            chatId={selectedChatId}
            addMessage={addMessage}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            replyingTo={replyingTo}
            setReplyingTo={setReplyingTo}
          />
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center min-h-full gap-[30px] text-3xl font-bold opacity-20 select-none text-center p-[50px]">
          <MessageIcon className="w-1/4" />
          <div>Selected Chat Will Appear Here</div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
