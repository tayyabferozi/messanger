import { useEffect, useState } from "react";
import cloneDeep from "clone-deep";

import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import MyAvatar from "./assets/user-3.jpg";
import User from "./assets/user.jpg";
import User2 from "./assets/user-2.jpg";
import Chevron from "./assets/chevron.svg";
import classes from "./index.module.scss";
import clsx from "clsx";

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

function App() {
  const [myUserName] = useState("Ferozi");
  const [chatItems, setChatItems] = useState(chatList);
  const [filteredChatItems, setFilteredChatItems] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isStarredActive, setIsStarredActive] = useState(false);
  const [isGroupActive, setIsGroupActive] = useState(false);
  const [isLeftPanelOpened, setIsLeftPanelOpened] = useState(false);

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

    setFilteredChatItems(filteredItems);
  }, [chatItems, searchValue, isStarredActive, isGroupActive]);

  return (
    <div className={classes.messageContainer}>
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
      />
      <RightPanel
        myUserName={myUserName}
        chatList={filteredChatItems}
        selectedChatId={selectedChatId}
        addMessage={addMessage}
        addReaction={addReaction}
        removeReaction={removeReaction}
      />
    </div>
  );
}

export default App;
