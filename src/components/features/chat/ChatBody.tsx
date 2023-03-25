import { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import { useSelector } from "react-redux";
import {
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Avatar } from "@mui/material";
import { RootState } from "../../../store/store";

type Message = {
  timeStamp: Timestamp;
  message: string;
  user: string;
  userImage?: string;
};

export const ChatBody = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const channelId = useSelector((state: RootState) => state.channel.channelId);

  useEffect(() => {
    let collectionRef = collection(
      db,
      "channels",
      String(channelId),
      "messages"
    );

    const cllectionRefOrderBy = query(
      collectionRef,
      orderBy("timeStamp", "desc")
    );

    onSnapshot(cllectionRefOrderBy, (snapshot) => {
      const newMessage = snapshot.docs.map((doc) => {
        return {
          timeStamp: doc.data().timeStamp,
          message: doc.data().message,
          user: doc.data().user,
          userImage: doc.data().userImage,
        };
      });
      setMessages(newMessage);
    });

    return () => {
      setMessages([]);
    };
  }, [channelId]);

  if (!channelId) {
    return (
      <div className="h-screen overflow-y-scroll">
        <div className="m-4">
          <h1 className="py-9 text-center text-xl font-bold text-white">
            <span className="block md:hidden">左上のトグルボタンから</span>
            チャンネルを選択してください
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-scroll">
      {messages.map((message, i) => (
        <div className="flex p-3 text-white" key={i}>
          <Avatar src={message.userImage} />
          <div className="pl-2">
            <h4>
              {message.user}
              <span className="ml-2 text-xs text-gray-400">
                {new Date(message.timeStamp?.toDate()).toLocaleString()}
              </span>
            </h4>
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};