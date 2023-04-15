import { useEffect, useRef, useState } from "react";
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
  const user = useSelector((state: RootState) => state.user.user);
  const channelId = useSelector((state: RootState) => state.channel.channelId);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let collectionRef = collection(
      db,
      "users",
      String(user?.uid),
      "privateChannel",
      String(channelId),
      "messages"
    );

    const cllectionRefOrderBy = query(
      collectionRef,
      orderBy("timeStamp", "asc")
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!channelId) {
    return (
      <div className="h-full">
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
    <div
      className="h-full overflow-y-scroll scrollbar-thin scrollbar-track-gray-700 scrollbar-thumb-gray-400"
      ref={scrollRef}
    >
      {messages.map((message, i) => (
        <div className="flex p-3 text-white" key={i}>
          <Avatar src={message.userImage} />
          <div className="pl-2">
            <h4>
              {message.user}
              <span className="ml-2 text-sm text-gray-400">
                {new Date(message.timeStamp?.toDate()).toLocaleString()}
              </span>
            </h4>
            <p dangerouslySetInnerHTML={{ __html: message.message }} />
          </div>
        </div>
      ))}
      <div id="overlay"></div>
    </div>
  );
};
