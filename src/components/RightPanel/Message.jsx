import React, { useEffect, useRef, useState } from "react";
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
  const reactRefSm = useRef();
  const [isReactPickerActive, setIsReactPickerActive] = useState(false);
  const [isReactPickerSmActive, setIsReactPickerSmActive] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [previewableImages, setPreviewableImages] = useState([]);
  const [previewingImg, setPreviewingImg] = useState("");

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

  useEffect(() => {
    const images =
      el?.attachments?.filter((el) => {
        return el?.type?.startsWith("image");
      }) || [];

    const attachments = el?.attachments?.filter((el) => {
      return !el?.type?.startsWith("image");
    });

    setAttachments(attachments);

    const previewableImages = [];

    async function pushPreviewable(image) {
      const preview = URL.createObjectURL(image);
      previewableImages.push(preview);
    }

    for (const image of images) {
      pushPreviewable(image);
    }
    setPreviewableImages(previewableImages);
  }, [el]);

  let senderName = iAmTheSender ? "Me" : el?.sender;

  useOnClickOutside(reactRef, () => {
    setIsReactPickerActive(false);
  });

  useOnClickOutside(reactRefSm, () => {
    setIsReactPickerSmActive(false);
  });

  const isMe = myUserName === el?.sender;

  return (
    <div className={clsx()}>
      {previewingImg && (
        <div className="z-[60] overflow-auto fixed w-full h-screen left-0 top-0 bg-[rgba(0,0,0,.9)]">
          <div
            className="text-6xl font-bold fixed right-9 top-10 cursor-pointer"
            onClick={() => setPreviewingImg("")}
          >
            &times;
          </div>
          <div className="h-[100%-160px] w-full overflow-auto p-10 flex justify-center items-center">
            <img src={previewingImg} alt="preview" className="w-1/2" />
          </div>
        </div>
      )}

      {shouldShowAvatar && (
        <div
          className={clsx(
            "flex items-center gap-4",
            isMe && "flex-row-reverse"
          )}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden relative">
            <img
              className="w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"
              src={avatar}
              alt={selectedChat?.name}
            />
          </div>
          <div className="text-white text-base font-semibold">{senderName}</div>
        </div>
      )}
      <div
        className={clsx(
          "my-[10px] p-4 rounded-2xl min-w-[260px] w-[calc(100%-130px+54px)] sm:w-[calc(100%-130px)] max-w-max text-white relative",
          isMe
            ? "bg-[#5156be] sm:mr-[54px] ml-auto"
            : "bg-[#373c39] sm:ml-[54px]",
          hasTopLeftCorner && "rounded-tl-[4px]",
          hasTopRightCorner && "rounded-tr-[4px]",
          hasBottomLeftCorner && "rounded-bl-[4px]",
          hasBottomRightCorner && "rounded-br-[4px]"
        )}
      >
        <div className="flex gap-1 absolute top-full -translate-y-1/2 z-10">
          {emojiOptions.map((el2, idx2) => {
            const key = el2.id + "-emoji-added-" + idx2;
            let numAdded = el?.reactions[el2?.label] || 0;
            if (numAdded > 0)
              return (
                <div
                  key={key}
                  className="px-[6px] bg-[#2c302e] py-1 border border-solid border-[#5156be] text-[13px] rounded-lg flex items-center gap-[6px] cursor-pointer font-bold"
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
        <div
          ref={reactRef}
          className={clsx(
            "lg:hidden absolute top-[calc(100%-3px)] border border-solid border-[#ffffff2f] bg-[#313533] px-2 py-1 rounded-lg flex opacity-0 pointer-events-none z-20",
            isReactPickerSmActive && "!opacity-100 !pointer-events-auto",
            isMe ? "right-0" : "left-0"
          )}
        >
          {emojiOptions.map((el, idx2) => {
            return (
              <button
                className="py-1 px-2 rounded-lg bg-transparent border-0 flex items-center justify-center cursor-pointer hover:bg-[#363a38]"
                key={el.id + "-emoji-" + idx2}
              >
                <img
                  className="w-[18px] max-w-[18px]"
                  src={el.icon}
                  alt={el.label}
                  onClick={() => {
                    addReaction(selectedChat?.id, idx, el.label);
                    setIsReactPickerSmActive(false);
                  }}
                />
              </button>
            );
          })}
        </div>
        <div
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 z-10",
            isMe
              ? "left-[calc(-24px-16px-28px-8px)] -translate-y-1/2"
              : "right-[calc(-24px-16px-28px-8px)]"
          )}
          ref={reactRef}
        >
          <div
            className={clsx(
              "hidden lg:flex absolute top-[calc(100%-3px)] border border-solid border-[#ffffff2f] bg-[#313533] px-2 py-1 rounded-lg opacity-0 pointer-events-none z-20",
              isReactPickerActive && "!opacity-100 !pointer-events-auto"
            )}
          >
            {emojiOptions.map((el, idx2) => {
              return (
                <button
                  className="py-1 px-2 rounded-lg bg-transparent border-0 flex items-center justify-center cursor-pointer hover:bg-[#363a38]"
                  key={el.id + "-emoji-" + idx2}
                >
                  <img
                    className="w-[18px] max-w-[18px]"
                    src={el.icon}
                    alt={el.label}
                    onClick={() => {
                      addReaction(selectedChat?.id, idx, el.label);
                      setIsReactPickerActive(false);
                      setIsReactPickerSmActive(false);
                    }}
                  />
                </button>
              );
            })}
          </div>
          <button
            className={clsx(
              "rounded-full cursor-pointer border-0 bg-[#2c302e] flex items-center justify-center w-[28px] h-[28px]"
            )}
            onClick={() => {
              setIsReactPickerActive(true);
              setIsReactPickerSmActive(true);
            }}
          >
            <img className="w-5 grayscale" src={Happiness} alt="happiness" />
          </button>
        </div>

        <button
          className={clsx(
            "absolute -translate-x-1/2 bg-transparent flex items-center justify-center w-[28x] h-[28px] rounded-full top-1/2 border-0 cursor-pointer",
            isMe
              ? "left-[calc(-24px-16px)] [transform:_rotateY(180deg)_translateY(-50%)]"
              : "right-[calc(-24px-16px)] -translate-y-1/2"
          )}
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
          <img className="w-5 invert" src={Reply} alt="reply" />
        </button>
        {el.inReplyTo && (
          <div className="border-l-[#ffffffa6] border-t-[#ffffff2a] border-b-[#ffffff2a] border-r-[#ffffff2a]">
            {el.inReplyTo}
          </div>
        )}

        {previewableImages?.length > 0 && (
          <div className="flex flex-col gap-1 border-b border-solid border-[rgba(255,255,255,.25)] pb-2 mb-2">
            {previewableImages?.map((el, idx) => {
              return (
                <div
                  key={"dropped-file-previewable-" + idx}
                  // className={classes.file}
                >
                  <img
                    onClick={() => setPreviewingImg(el)}
                    className="max-w-[500px] mx-auto w-full cursor-pointer"
                    src={el}
                    alt="file"
                  />
                </div>
              );
            })}
          </div>
        )}

        {attachments?.length > 0 && (
          <div className="grid gap-1 border-b border-solid border-[rgba(255,255,255,.25)] pb-2 mb-4 transition-all grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {attachments?.map((el, idx) => {
              let isImg = false;
              if (el?.type?.startsWith("image")) {
                isImg = true;
              }
              return (
                <div
                  key={"dropped-file-" + idx}
                  className="border border-solid border-[rgba(56,61,59,.325)] rounded-lg p-2 pr-8 flex items-center gap-2 text-white h-10 relative text-sm"
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
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => {}}
                  >
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
