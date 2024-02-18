import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import cloneDeep from "clone-deep";
import clsx from "clsx";

import ChatBox from "./ChatBox";
import { ReactComponent as MessageIcon } from "../../assets/message.svg";
import GroupFill from "../../assets/group.png";
import classes from "./RightPanel.module.scss";
import Message from "./Message";

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
    <div className={classes.rightPanel} {...getRootProps()}>
      <div className={clsx(classes.dropFiles, isDragEntered && classes.active)}>
        Drop your file/s
      </div>
      <input {...getInputProps()} />
      {selectedChat ? (
        <div className={classes.chatPanel}>
          <div className={classes.header}>
            <div className={clsx(classes.avatar)}>
              <img
                className={selectedChat?.isGroup && classes.groupIcon}
                src={selectedChat?.isGroup ? GroupFill : selectedChat?.img}
                alt={selectedChat?.name}
              />
            </div>
            <div className={classes.name}>{selectedChat?.name}</div>
          </div>
          <div className={classes.chatMain}>
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
        <div className={classes.placeholder}>
          <MessageIcon />
          <div>Selected Chat Will Appear Here</div>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
