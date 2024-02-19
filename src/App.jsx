import { useEffect, useState } from "react";
import clsx from "clsx";
import cloneDeep from "clone-deep";
import ReactSelect from "react-select";

import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import MyAvatar from "./assets/user-3.jpg";
import User from "./assets/user.jpg";
import User2 from "./assets/user-2.jpg";
import Chevron from "./assets/chevron.svg";
import "./App.css";

const chatList = [
  {
    id: "random-chat-id-1",
    img: User,
    name: "Talan Septimus Long Name",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Hi",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        text: "You there?",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        text: "We need to talk",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-002",
    name: "Group Name here",
    isGroup: true,
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Aubrey Webb",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-2",
    img: User2,
    name: "Aubrey Webb",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-3",
    img: User,
    name: "Kathryn Richards",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-4",
    img: User2,
    name: "Nathan Fox",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-5",
    img: User,
    name: "Bruce Warren",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-6",
    img: User2,
    name: "Norma Watson",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-7",
    img: User,
    name: "Diane Black",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-8",
    img: User2,
    name: "Soham Howard",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-9",
    img: User,
    name: "Brandon Bell",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-10",
    img: User2,
    name: "Soham Howard",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User2,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
  {
    id: "random-chat-id-11",
    img: User,
    name: "Brandon Bell",
    isFavorite: false,
    messages: [
      {
        timestamp: new Date().getTime(),
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Ferozi",
        reactions: {},
      },
      {
        timestamp: new Date().getTime(),
        img: User,
        text: "Not again is there anyone who loves or pursues or desires to obtain pain of itself",
        sender: "Talan Septimus",
        reactions: {},
      },
    ],
  },
];

const newChatOptions = {
  "John Doe": { img: User },
  "Jane Doe": { img: User2 },
  Foo: { img: User2 },
};

function App() {
  const [myUserName] = useState("Ferozi");
  const [chatItems, setChatItems] = useState(chatList);
  const [filteredChatItems, setFilteredChatItems] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isStarredActive, setIsStarredActive] = useState(false);
  const [isGroupActive, setIsGroupActive] = useState(false);
  const [isLeftPanelOpened, setIsLeftPanelOpened] = useState(true);
  const [isNewChatMode, setIsNewChatMode] = useState(false);
  const [newChatSelectedOptions, setNewChatSelectedOptions] = useState([]);
  const [groupImg, setGroupImg] = useState({});
  const [groupName, setGroupName] = useState("");

  const addOrRemoveFavorite = (id) => {
    setChatItems((prev) => {
      const newState = cloneDeep(prev);
      const idx = newState.findIndex((el) => el.id === id);
      newState[idx].isFavorite = !newState[idx].isFavorite;
      return newState;
    });
  };

  const addMessage = (id, msg) => {
    setChatItems((prev) => {
      const newState = cloneDeep(prev);
      const idx = newState.findIndex((el) => el.id === id);
      newState[idx].messages.push({
        ...msg,
        sender: myUserName,
        img: MyAvatar,
        reactions: {},
      });
      return newState;
    });
  };

  const addReaction = (id, idx, label) => {
    setChatItems((prev) => {
      const newState = cloneDeep(prev);
      const foundIdx = newState.findIndex((el) => el.id === id);
      let reactions = newState[foundIdx].messages[idx].reactions;
      if (reactions[label]) {
        reactions[label]++;
      } else {
        reactions = { ...reactions, [label]: 1 };
      }
      newState[foundIdx].messages[idx].reactions = reactions;

      return newState;
    });
  };

  const removeReaction = (id, idx, label) => {
    setChatItems((prev) => {
      const newState = cloneDeep(prev);
      const foundIdx = newState.findIndex((el) => el.id === id);
      let reactions = newState[foundIdx].messages[idx].reactions;
      if (reactions[label]) {
        reactions[label]--;
      } else {
        reactions = { ...reactions, [label]: 0 };
      }
      newState[foundIdx].messages[idx].reactions = reactions;

      return newState;
    });
  };

  useEffect(() => {
    let filteredItems;

    filteredItems = chatItems.filter((el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (isStarredActive)
      filteredItems = filteredItems.filter((el, idx) => el.isFavorite);
    if (isGroupActive)
      filteredItems = filteredItems.filter((el, idx) => el.isGroup);

    setFilteredChatItems(filteredItems);
  }, [chatItems, searchValue, isStarredActive, isGroupActive]);

  return (
    <div className="h-screen bg-[#313533] text-[#ced4da] flex">
      <div
        className={clsx(
          "bg-[rgba(49,53,51,.75)] backdrop:blur-sm fixed left-0 top-0 right-0 bottom-0 z-[60] transition-all",
          isNewChatMode
            ? "pointer-events-none opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => {
          setIsNewChatMode(false);
        }}
      />
      <div
        className={clsx(
          "fixed w-[calc(100%-80px)] max-w-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100vh-80px)] bg-[#292d2c] z-[60] rounded-2xl transition-all pt-10 px-6 pb-9",
          isNewChatMode
            ? "pointer-events-auto opacity-100"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute right-5 top-5 text-[40px] leading-none cursor-pointer"
          onClick={() => {
            setIsNewChatMode(false);
          }}
        >
          &times;
        </div>

        <h2 className="text-center text-white mb-6 text-2xl font-bold">
          Start New Chat
        </h2>

        <ReactSelect
          isMulti={true}
          value={newChatSelectedOptions}
          onChange={(e) => setNewChatSelectedOptions(e)}
          options={Object.keys(newChatOptions).map((el) => ({
            label: el,
            value: { name: el, img: newChatOptions[el].img },
          }))}
          placeholder="Choose recepients"
          styles={{
            multiValue: (baseStyles, state) => ({
              ...baseStyles,
              background: "#383d3b",
            }),
            multiValueLabel: (baseStyles, state) => ({
              ...baseStyles,
              color: "#fff",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              background: "#2c302e",
              "&:hover": {
                background: "#383d3b",
              },
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,
              background: "#383d3b",
            }),

            control: (baseStyles, state) => ({
              ...baseStyles,
              background: "transparent",
              borderColor: "#383d3b",
              boxShadow: "transparent",
              color: "#fff",
              "&:hover": {
                borderColor: "#2c302e",
              },
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              color: "#fff",
            }),
          }}
        />

        {newChatSelectedOptions.length > 1 && (
          <div>
            <input
              className="w-full h-10 px-3 bg-transparent border border-solid border-[#383d3b] rounded-[4px] mt-5 text-sm outline-none"
              placeholder="Group Name..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <input
              id="group-img"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setGroupImg(e.target.files[0]);
              }}
            />
            <label
              htmlFor="group-img"
              className="w-full flex items-center justify-center h-20 px-3 bg-transparent border-[2px] border-dashed border-[#383d3b] rounded-[4px] mt-5 text-sm outline-none"
            >
              {groupImg?.name || "Choose Group Image"}
            </label>
          </div>
        )}

        <button
          className="bg-[#5156be] h-[50px] mt-10 block mx-auto py-0 px-6 text-white font-bold rounded-[10px] border-0 text-base cursor-pointer transition-all hover:-translate-y-1"
          onClick={() => {
            if (newChatSelectedOptions.length > 0) {
              if (newChatSelectedOptions.length > 1) {
                setChatItems((prev) => {
                  const newState = cloneDeep(prev);
                  let img = URL.createObjectURL(groupImg);

                  const recepients = newChatSelectedOptions
                    .map((el) => el?.value?.name)
                    .join(", ");

                  newState.unshift({
                    id: Math.random(),
                    isGroup: true,
                    img,
                    recepients: recepients,
                    name: groupName || recepients,
                    isFavorite: false,
                    messages: [],
                  });
                  return newState;
                });
              } else {
                setChatItems((prev) => {
                  const newState = cloneDeep(prev);

                  newState.unshift({
                    id: Math.random(),
                    img: newChatSelectedOptions[0]?.value?.img,
                    name: newChatSelectedOptions[0]?.value?.name,
                    isGroup: false,
                    isFavorite: false,
                    messages: [],
                  });
                  return newState;
                });
              }

              setGroupImg({});
              setGroupName("");
              setNewChatSelectedOptions([]);
            }
            setIsNewChatMode(false);
          }}
        >
          Start Chart
        </button>
      </div>
      <div
        className={clsx(
          "xl:!hidden fixed left-0 z-50 bg-[#383d3b] border border-solid border-[#5156be] bl-0 block p-[6px] pl-[10px] rounded-tr-[4px] rounded-br-[4px] transition-all xs:top-[140px] top-20",
          isLeftPanelOpened &&
            "!left-[350px] xs:!border-l xs:!border-r-0 xs:!rounded-tl-[4px] xs:!rounded-bl-[4px] xs:!rounded-tr-none xs:!rounded-br-none xs:!left-[unset] xs:!right-0"
        )}
        onClick={() => setIsLeftPanelOpened(!isLeftPanelOpened)}
      >
        <img
          className={clsx(
            "transition-all block invert w-5",
            isLeftPanelOpened
              ? "[transform:_rotateY(0deg)]"
              : "[transform:_rotateY(180deg)]"
          )}
          src={Chevron}
          alt="chevron"
        />
      </div>
      <LeftPanel
        opened={isLeftPanelOpened}
        myUserName={myUserName}
        setOpened={setIsLeftPanelOpened}
        chatItems={filteredChatItems}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        addOrRemoveFavorite={addOrRemoveFavorite}
        isStarredActive={isStarredActive}
        setIsStarredActive={setIsStarredActive}
        isGroupActive={isGroupActive}
        setIsGroupActive={setIsGroupActive}
        setIsNewChatMode={setIsNewChatMode}
      />
      <RightPanel
        myUserName={myUserName}
        chatList={filteredChatItems}
        selectedChatId={selectedChatId}
        addMessage={addMessage}
        addReaction={addReaction}
        removeReaction={removeReaction}
        isNewChatMode={isNewChatMode}
        newChatOptions={newChatOptions}
        newChatSelectedOptions={newChatSelectedOptions}
        setNewChatSelectedOptions={setNewChatSelectedOptions}
      />
    </div>
  );
}

export default App;
