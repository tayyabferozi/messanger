import clsx from "clsx";

import Search from "../../assets/search.svg";
import StarEmpty from "../../assets/star-empty.png";
import StarFill from "../../assets/star-fill.png";
import GroupFill from "../../assets/group.png";
import MyAvatar from "../../assets/user-3.jpg";
import classes from "./LeftPanel.module.scss";

const LeftPanel = ({
  opened,
  setOpened,
  searchValue,
  setSearchValue,
  selectedChatId,
  setSelectedChatId,
  chatItems,
  addOrRemoveFavorite,
  isStarredActive,
  setIsStarredActive,
  isGroupActive,
  setIsGroupActive,
  setIsNewChatMode,
}) => {
  return (
    <>
      <div className={clsx(classes.leftPanel, opened && classes.opened)}>
        <div className={classes.header}>
          <div className={classes.left}>
            <div className={classes.avatar}>
              <img src={MyAvatar} alt="my-avatar" />
            </div>
            <h3>My Name</h3>
          </div>
          <button
            onClick={() => setIsNewChatMode(true)}
            className={classes.addBtn}
          >
            +
          </button>
        </div>

        <div className={classes.top}>
          <div className={classes.searchContainer}>
            <input
              className={classes.search}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <img className={classes.icon} src={Search} alt="search" />
          </div>

          <div className={classes.titleContainer}>
            <h3 className={classes.title}>chats</h3>

            <div className={classes.actions}>
              <button
                className={clsx(classes.btn, isStarredActive && classes.active)}
                onClick={() => setIsStarredActive(!isStarredActive)}
              >
                <img src={StarFill} alt="starred" />
              </button>
              <button
                className={clsx(classes.btn, isGroupActive && classes.active)}
                onClick={() => setIsGroupActive(!isGroupActive)}
              >
                <img src={GroupFill} alt="group" />
              </button>
            </div>
          </div>
        </div>

        <div className={classes.chatList}>
          {chatItems?.length < 1 ? (
            <div className={classes.noChats}>No chats to show</div>
          ) : (
            chatItems?.map((el, idx) => {
              let lastMessage;
              if (el?.messages?.length > 0) {
                lastMessage = el.messages[el.messages.length - 1].text;
                lastMessage =
                  lastMessage.slice(0, 24) +
                  " " +
                  (lastMessage.length > 24 ? "..." : "");
              }

              return (
                <div
                  key={"chat-item-" + idx}
                  className={clsx(
                    classes.chatItem,
                    selectedChatId === el.id && classes.active
                  )}
                  onClick={() => {
                    setSelectedChatId(el.id);
                    setOpened(false);
                    setIsNewChatMode(false);
                  }}
                >
                  <div className={classes.chatItemLeft}>
                    <div className={classes.chatAvatar}>
                      <img
                        className={clsx(el?.isGroup && classes.groupIcon)}
                        src={el?.isGroup ? GroupFill : el.img}
                        alt={el.name}
                      />
                    </div>
                    <div className={classes.chatText}>
                      <h6>
                        {el?.name?.slice(0, 16)}{" "}
                        {el?.name?.length > 16 ? "..." : ""}
                      </h6>
                      <p>{lastMessage}</p>
                    </div>
                  </div>
                  <div
                    className={classes.favorite}
                    onClick={(e) => {
                      e.stopPropagation();
                      addOrRemoveFavorite(el?.id);
                    }}
                  >
                    <img src={StarEmpty} alt="star" />
                    {el?.isFavorite && <img src={StarFill} alt="star" />}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default LeftPanel;
