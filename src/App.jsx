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
import classes from "./index.module.scss";
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
    <div className={classes.messageContainer}>
      <div
        className={clsx(classes.modalOverlay, isNewChatMode && classes.active)}
        onClick={() => {
          setIsNewChatMode(false);
        }}
      />
      <div className={clsx(classes.modal, isNewChatMode && classes.active)}>
        <div
          className={classes.close}
          onClick={() => {
            setIsNewChatMode(false);
          }}
        >
          &times;
        </div>

        <h2>Start New Chat</h2>

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

        <button
          className={classes.button}
          onClick={() => {
            if (newChatSelectedOptions.length > 0) {
              if (newChatSelectedOptions.length > 1) {
                setChatItems((prev) => {
                  const newState = cloneDeep(prev);

                  const recepients = newChatSelectedOptions
                    .map((el) => el?.value?.name)
                    .join(", ");

                  newState.unshift({
                    id: Math.random(),
                    isGroup: true,
                    recepients: recepients,
                    name: recepients,
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
            }
            setIsNewChatMode(false);
          }}
        >
          Start Chart
        </button>
      </div>
      <div
        className={clsx(
          classes.leftOpener,
          isLeftPanelOpened && classes.leftOpened
        )}
        onClick={() => setIsLeftPanelOpened(!isLeftPanelOpened)}
      >
        <img src={Chevron} alt="chevron" />
      </div>
      <LeftPanel
        opened={isLeftPanelOpened}
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
