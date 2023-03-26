import { collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useSelector } from "react-redux";
import { db } from "../../../utils/firebase";
import { RootState } from "../../../store/store";
import { Prompt } from "../../../utils/types";
import { addDocToCollection } from "./functions/addDocToCollection";
import { useCallGPT } from "./hooks/useCallGPT";
import { Spinner } from "../../ui/Spinner";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Prompt[]>([]);
  const [draChatHistory, setDraChatHistory] = useState<Prompt[]>([]);
  const channelId = useSelector((state: RootState) => state.channel.channelId);
  const { callGPT, callDra, loading } = useCallGPT();
  const user = useSelector((state: RootState) => state.user.user);

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

    if (message.startsWith("/dra")) {
      callDra(message, draChatHistory, setDraChatHistory, collectionRef);
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
            className="mr-2 flex-1 rounded-lg border border-gray-200 px-4 py-2 text-xs focus:outline-none md:text-lg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />
          <button
            type="submit"
            className="rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 focus:outline-none"
            onClick={(e: React.MouseEvent<HTMLElement>) => sendMessage(e)}
          >
            <BsSend />
          </button>
        </form>
      )}
    </div>
  );
};
