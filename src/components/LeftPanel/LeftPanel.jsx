import clsx from "clsx";

import Search from "../../assets/search.svg";
import StarEmpty from "../../assets/star-empty.png";
import StarFill from "../../assets/star-fill.png";
import GroupFill from "../../assets/group.png";
import MyAvatar from "../../assets/user-3.jpg";

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
  setIsNewOrEditChatMode,
}) => {
  return (
    <>
      <div
        className={clsx(
          "border-r border-solid border-[#383d3b] w-[350px] flex-grow-0 flex-shrink-0 pb-6 bg-[#2c302e] overflow-auto transition-all fixed xl:static top-0 z-40 h-screen xl:h-auto xs:-left-full xs:w-full",
          opened ? "!left-0" : "-left-[350px]"
        )}
      >
        <div className="flex justify-between items-center pt-6 px-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img className="w-full" src={MyAvatar} alt="my-avatar" />
            </div>
            <h3 className="font-bold">My Name</h3>
          </div>
          <button
            onClick={() => setIsNewOrEditChatMode(true)}
            className="w-10 h-10 rounded-full text-[30px] flex justify-center items-center leading-normal border-0 bg-[#383d3b] text-white cursor-pointer transition-all hover:bg-[#363a38]"
          >
            +
          </button>
        </div>

        <div className="sticky bg-[#2c302e] top-0 z-10 p-6 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-[#383d3b]">
          <div className="relative">
            <input
              className="h-11 w-full rounded-[4px] border border-solid border-[#383d3b] py-2 pl-[42px] pr-4 text-sm text-inherit outline-none bg-[#363a38] transition-all focus:border-[#5156be]"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <img
              className="w-5 absolute top-1/2 -translate-y-1/2 left-[14px]"
              src={Search}
              alt="search"
            />
          </div>

          <div className="flex justify-between items-center gap-4 mt-6">
            <h3 className="text-2xl font-bold">chats</h3>

            <div className="flex items-center gap-2">
              <button
                className={clsx(
                  "border border-solid border-[#383d3b] w-[50px] h-[50px] rounded-lg flex justify-center items-center bg-transparent cursor-pointer transition-all md:hover:bg-[#383d3b]",
                  isStarredActive && "!bg-[#383d3b]"
                )}
                onClick={() => setIsStarredActive(!isStarredActive)}
              >
                <img className="invert w-8" src={StarFill} alt="starred" />
              </button>
              <button
                className={clsx(
                  "border border-solid border-[#383d3b] w-[50px] h-[50px] rounded-lg flex justify-center items-center bg-transparent cursor-pointer transition-all md:hover:bg-[#383d3b]",
                  isGroupActive && "!bg-[#383d3b]"
                )}
                onClick={() => setIsGroupActive(!isGroupActive)}
              >
                <img className="invert w-8" src={GroupFill} alt="group" />
              </button>
            </div>
          </div>
        </div>

        <div className="">
          {chatItems?.length < 1 ? (
            <div className="text-center text-5 p-5 opacity-50">
              No chats to show
            </div>
          ) : (
            chatItems?.map((el, idx) => {
              let lastMessage;
              if (el?.messages?.length > 0) {
                lastMessage = el.messages[el.messages.length - 1].text;
                lastMessage =
                  lastMessage.slice(0, 24) +
                  " " +
                  (lastMessage.length > 24 ? "..." : "");
              } else {
                lastMessage = "Be the first to type a message";
              }

              return (
                <div
                  key={"chat-item-" + idx}
                  className={clsx(
                    "flex justify-between items-center gap-4 px-6 py-4 cursor-pointer relative transition-all after:absolute after:left-1/2 after:-translate-x-1/2 after:w-[300px] after:bottom-0 after:h-[1px] after:bg-[#383d3b]",
                    selectedChatId === el.id && "!bg-[#383d3b]"
                  )}
                  onClick={() => {
                    setSelectedChatId(el.id);
                    setOpened(false);
                    setIsNewOrEditChatMode(false);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative xs:!w-10 xs:!h-10">
                      <img
                        className={clsx(
                          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full",
                          el?.isGroup &&
                            !el?.img &&
                            "invert border solid border-[#383d3b] rounded-full"
                        )}
                        src={el?.isGroup ? el.img || GroupFill : el.img}
                        alt={el.name}
                      />
                    </div>
                    <div className="">
                      <h6 className="text-lg mb-2 font-bold">
                        {el?.name?.slice(0, 16)}{" "}
                        {el?.name?.length > 16 ? "..." : ""}
                      </h6>
                      <p className="text-sm text-white opacity-50">
                        {lastMessage}
                      </p>
                    </div>
                  </div>
                  <div
                    className="invert w-8 h-8 relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      addOrRemoveFavorite(el?.id);
                    }}
                  >
                    <img
                      className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                      src={StarEmpty}
                      alt="star"
                    />
                    {el?.isFavorite && (
                      <img
                        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                        src={StarFill}
                        alt="star"
                      />
                    )}
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
