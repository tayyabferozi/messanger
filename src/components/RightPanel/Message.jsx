import React, { useRef, useState } from "react";
import clsx from "clsx";

import LikeEmoji from "../../assets/thumbs-up.png";
import HeartEmoji from "../../assets/heart.png";
import LaughEmoji from "../../assets/laugh.png";
import SadEmoji from "../../assets/sad.png";
import WowEmoji from "../../assets/wow.png";
import AttachImage from "../../assets/attach-image.png";
import FileIcon from "../../assets/file-solid.svg";
import MyAvatar from "../../assets/user-3.jpg";
import Happiness from "../../assets/happiness.png";
import Reply from "../../assets/reply.png";
import { ReactComponent as Download } from "../../assets/download.svg";
import classes from "./RightPanel.module.scss";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const emojiOptions = [
  {
    icon: LikeEmoji,
    label: "👍",
  },
  {
    icon: HeartEmoji,
    label: "❤️",
  },
  {
    icon: LaughEmoji,
    label: "😂",
  },
  {
    icon: SadEmoji,
    label: "😢",
  },
  {
    icon: WowEmoji,
    label: "😮",
  },
];

const Message = ({
  el,
  selectedChat,
  idx,
  myUserName,
  setReplyingTo,
  addReaction,
  removeReaction,
}) => {
  const reactRef = useRef();
  const [isReactPickerActive, setIsReactPickerActive] = useState(false);

  let avatar;
  let iAmTheSender = myUserName === el.sender;
  if (iAmTheSender) avatar = MyAvatar;
  else avatar = el.img;

  let shouldShowAvatar = false;

  let prevMessageIsMine =
    idx !== 0 && selectedChat.messages[idx - 1]?.sender === el?.sender;
  let nextMessageIsMine = selectedChat.messages[idx + 1]?.sender === el?.sender;

  if (!prevMessageIsMine) shouldShowAvatar = true;

  let hasTopLeftCorner = false;
  let hasTopRightCorner = false;
  let hasBottomLeftCorner = false;
  let hasBottomRightCorner = false;

  if (iAmTheSender) {
    if (prevMessageIsMine) hasTopRightCorner = true;
    if (nextMessageIsMine) hasBottomRightCorner = true;
  } else {
    if (prevMessageIsMine) hasTopLeftCorner = true;
    if (nextMessageIsMine) hasBottomLeftCorner = true;
  }

  let senderName = iAmTheSender ? "Me" : el?.sender;

  useOnClickOutside(reactRef, () => {
    setIsReactPickerActive(false);
  });

  return (
    <div
      className={clsx(
        classes.chatMessage,
        myUserName === el?.sender ? classes.me : classes.him
      )}
    >
      {shouldShowAvatar && (
        <div className={classes.chatMessageAvatarContainer}>
          <div className={classes.chatMessageAvatar}>
            <img src={avatar} alt={selectedChat?.name} />
          </div>
          <div className={classes.chatMessageName}>{senderName}</div>
        </div>
      )}
      <div
        className={clsx(
          classes.chatMessageBox,
          hasTopLeftCorner && classes.hasTopLeftCorner,
          hasTopRightCorner && classes.hasTopRightCorner,
          hasBottomLeftCorner && classes.hasBottomLeftCorner,
          hasBottomRightCorner && classes.hasBottomRightCorner
        )}
      >
        <div className={classes.addedReactions}>
          {emojiOptions.map((el2, idx2) => {
            const key = el2.id + "-emoji-added-" + idx2;
            let numAdded = el?.reactions[el2?.label] || 0;
            if (numAdded > 0)
              return (
                <div
                  key={key}
                  className={classes.addedReaction}
                  onClick={() => {
                    removeReaction(selectedChat?.id, idx, el2.label);
                    setIsReactPickerActive(false);
                  }}
                >
                  <span>{el2.label} </span>
                  <span>{el.reactions[el2.label]}</span>
                </div>
              );
            return <React.Fragment key={key} />;
          })}
        </div>
        <div className={classes.reactionBtnWrapper} ref={reactRef}>
          <div
            className={clsx(
              classes.emojiPickers,
              isReactPickerActive && classes.active
            )}
          >
            {emojiOptions.map((el, idx2) => {
              return (
                <button key={el.id + "-emoji-" + idx2}>
                  <img
                    src={el.icon}
                    alt={el.label}
                    onClick={() => {
                      addReaction(selectedChat?.id, idx, el.label);
                      setIsReactPickerActive(false);
                    }}
                  />
                </button>
              );
            })}
          </div>
          <button
            className={clsx(classes.reactionBtn)}
            onClick={() => setIsReactPickerActive(true)}
          >
            <img src={Happiness} alt="happiness" />
          </button>
        </div>

        <button
          className={classes.replyBtn}
          onClick={() =>
            setReplyingTo(
              el.text
                ? el.text
                : el.attachments
                ? "Attachments from " + el?.name
                : "A message from " + el?.name
            )
          }
        >
          <img className={classes.reply} src={Reply} alt="reply" />
        </button>
        {el.inReplyTo && (
          <div className={classes.replyingTo}>{el.inReplyTo}</div>
        )}

        {el?.attachments?.length > 0 && (
          <div className={classes.attachments}>
            {el?.attachments?.map((el, idx) => {
              let isImg = false;
              if (el?.type?.startsWith("image")) {
                isImg = true;
              }
              return (
                <div key={"dropped-file-" + idx} className={classes.file}>
                  <img
                    className={clsx(isImg && classes.invert)}
                    src={isImg ? AttachImage : FileIcon}
                    alt="file"
                  />
                  <p>
                    {el.name.slice(0, 16)} {el.name.length > 16 ? "..." : ""}
                  </p>
                  <div className={classes.download} onClick={() => {}}>
                    <Download />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {el.text}
      </div>
    </div>
  );
};

export default Message;
