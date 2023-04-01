import { collection, serverTimestamp } from "firebase/firestore";
import { FC, useState } from "react";
import { BsSend } from "react-icons/bs";
import { db } from "../../../utils/firebase";
import { InitialChannnelState, Prompt, User } from "../../../utils/types";
import { addDocToCollection } from "./functions/addDocToCollection";
import { useCallGPT } from "./hooks/useCallGPT";
import { Spinner } from "../../ui/Spinner";

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
  const { channelId, channelName } = channel;
  const {
    callGPT,
    callDra,
    callNaruto,
    callGoku,
    callBakabon,
    callIkyuu,
    callLuffy,
    loading,
  } = useCallGPT(channelName);

  const sendMessage = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!message) return;

    const collectionRef = collection(
      db,
      "channels",
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
      callDra(
        message,
        user?.displayName,

        draChatHistory,
        setDraChatHistory,
        collectionRef
      );
    }
    if (channelName === "うずまきナルト") {
      callNaruto(
        message,
        user?.displayName,

        narutoChatHistory,
        setNarutoChatHistory,
        collectionRef
      );
    }
    if (channelName === "孫悟空") {
      callGoku(
        message,
        user?.displayName,
        gokuChatHistory,
        setGokuChatHistory,
        collectionRef
      );
    }
    if (channelName === "バカボンのパパ") {
      callBakabon(
        message,
        user?.displayName,
        bakabonChatHistory,
        setBakabonChatHistory,
        collectionRef
      );
    }
    if (channelName === "一休さん") {
      callIkyuu(
        message,
        user?.displayName,
        ikyuuChatHistory,
        setIkyuuChatHistory,
        collectionRef
      );
    }
    if (channelName === "モンキー・D・ルフィ") {
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

  return (
    <div className="ml-2 items-center justify-start p-2 shadow-md md:mx-16">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <form className="flex">
          <input
            type="text"
            placeholder={`メッセージを送信`}
            value={message}
            className="mr-2 flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none md:text-lg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
          <button
            type="submit"
            className="rounded-lg bg-teal-600 px-4 py-2 text-white focus:outline-none hover:bg-teal-700"
            onClick={(e: React.MouseEvent<HTMLElement>) => sendMessage(e)}
          >
            <BsSend />
          </button>
        </form>
      )}
    </div>
  );
};
