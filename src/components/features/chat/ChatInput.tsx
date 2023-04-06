import { collection, serverTimestamp } from "firebase/firestore";
import { FC, useState } from "react";
import { BsSend } from "react-icons/bs";
import { GiMagicBroom } from "react-icons/gi";
import { db } from "../../../utils/firebase";
import { InitialChannnelState, Prompt, User } from "../../../utils/types";
import { addDocToCollection } from "./functions/addDocToCollection";
import { useCallGPT } from "./hooks/useCallGPT";
import { Spinner } from "../../ui/Spinner";
import { deleteContext } from "./functions/deleteContext";
import { Modal } from "../../ui/Modal";
import { Tooltip } from "@mui/material";
import { MessageBox } from "../../ui/MessageBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type Props = {
  channel: InitialChannnelState;
  user: User;
};

export const ChatInput: FC<Props> = ({ channel, user }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Prompt[]>([]);
  const [draChatHistory, setDraChatHistory] = useState<Prompt[]>([]);
  const [narutoChatHistory, setNarutoChatHistory] = useState<Prompt[]>([]);
  const [gokuChatHistory, setGokuChatHistory] = useState<Prompt[]>([]);
  const [bakabonChatHistory, setBakabonChatHistory] = useState<Prompt[]>([]);
  const [ikyuuChatHistory, setIkyuuChatHistory] = useState<Prompt[]>([]);
  const [luffyChatHistory, setLuffyChatHistory] = useState<Prompt[]>([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { channelId, channelName } = channel;
  const [chatHistoryForDeletion, setChatHistoryForDeletion] =
    useState<(chatHistory: Prompt[]) => void>();
  const apiKey = useSelector((state: RootState) => state.key.apiKey);
  const {
    callGPT,
    callDra,
    callNaruto,
    callGoku,
    callBakabon,
    callIkyuu,
    callLuffy,
    loading,
  } = useCallGPT(channelName, setError);
  const isDra = channelName === "ドラえもん";

  const sendMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!message || !user) return;

    const collectionRef = collection(
      db,
      "users",
      user.uid,
      "privateChannel",
      String(channelId),
      "messages"
    );

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    if (message.startsWith("/gpt")) {
      callGPT(message, chatHistory, setChatHistory, collectionRef);
    }

    if (channelName === "ドラえもん") {
      setChatHistoryForDeletion(setDraChatHistory);
      callDra(
        message,
        user?.displayName,
        draChatHistory,
        setDraChatHistory,
        collectionRef
      );
    }
    if (channelName === "うずまきナルト") {
      setChatHistoryForDeletion(setNarutoChatHistory);
      callNaruto(
        message,
        user?.displayName,
        narutoChatHistory,
        setNarutoChatHistory,
        collectionRef
      );
    }
    if (channelName === "孫悟空") {
      setChatHistoryForDeletion(setGokuChatHistory);
      callGoku(
        message,
        user?.displayName,
        gokuChatHistory,
        setGokuChatHistory,
        collectionRef
      );
    }
    if (channelName === "バカボンのパパ") {
      setChatHistoryForDeletion(setBakabonChatHistory);
      callBakabon(
        message,
        user?.displayName,
        bakabonChatHistory,
        setBakabonChatHistory,
        collectionRef
      );
    }
    if (channelName === "一休さん") {
      setChatHistoryForDeletion(setIkyuuChatHistory);
      callIkyuu(
        message,
        user?.displayName,
        ikyuuChatHistory,
        setIkyuuChatHistory,
        collectionRef
      );
    }
    if (channelName === "モンキー・D・ルフィ") {
      setChatHistoryForDeletion(setLuffyChatHistory);
      callLuffy(
        message,
        user?.displayName,
        luffyChatHistory,
        setLuffyChatHistory,
        collectionRef
      );
    }

    setMessage("");
  };

  if (channelId == null) return null;
  if (error)
    return (
      <div className="absolute top-1/3 mx-5	md:right-1/4">
        <MessageBox title={error}>
          リロードの後、再度やり直してください
        </MessageBox>
      </div>
    );

  return (
    <div className="items-center justify-start p-2 shadow-md md:mx-16">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <form className="flex gap-2">
          <Tooltip
            title="会話の記憶を消去します"
            className={apiKey || isDra ? "flex items-center" : "hidden"}
          >
            <div>
              <Modal
                message="会話の記憶を消去しますか？"
                openComponent={
                  <div
                    className={
                      apiKey || isDra
                        ? "items-center justify-center rounded-full bg-teal-600 p-2 text-white shadow-md transition-colors hover:bg-teal-700"
                        : "items-center justify-center rounded-full bg-gray-400 p-2 text-white shadow-md transition-colors"
                    }
                  >
                    <GiMagicBroom className="text-lg md:text-2xl" />
                  </div>
                }
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                onSubmit={(e: React.MouseEvent<HTMLElement>) => {
                  if (chatHistoryForDeletion) {
                    deleteContext(e, chatHistoryForDeletion);
                  }
                }}
              ></Modal>
            </div>
          </Tooltip>
          <input
            type="text"
            placeholder={
              apiKey || isDra
                ? "例) 将来が心配。どうすればいい？"
                : "APIキーを登録してください"
            }
            value={message}
            disabled={!apiKey && !isDra}
            className={
              apiKey || isDra
                ? "flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none md:text-lg"
                : "flex-1 rounded-lg border bg-gray-600 px-4 py-2 text-sm focus:outline-none md:text-lg"
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
          <button
            type="submit"
            disabled={!apiKey && !isDra}
            className={
              apiKey || isDra
                ? "rounded-lg bg-teal-600 px-4 py-2 text-white focus:outline-none hover:bg-teal-700"
                : "rounded-lg bg-teal-900 px-4 py-2 text-white "
            }
            onClick={(e: React.MouseEvent<HTMLElement>) => sendMessage(e)}
          >
            <BsSend />
          </button>
        </form>
      )}
    </div>
  );
};
