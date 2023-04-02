import { BsChatRight, BsPlusCircle } from "react-icons/bs";
import { addDoc, collection, doc, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import { onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setChannelInfo } from "../../../store/channelSlice";
import { Channel } from "../../../utils/types";
import { RootState } from "../../../store/store";
import { Avatar } from "@mui/material";
import { characterImage } from "../../../utils/constants";

export const Sidebar = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const q = query(collection(db, "users", String(user?.uid), "privateChannel"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const channnelResult: Channel[] = [];
      snapshot.docs.map((doc) =>
        channnelResult.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setChannels(channnelResult);
    });
  }, []);

  const addChannel = async () => {
    const channelName = prompt("チャンネル名を入力してください");
    if (channelName && user) {
      const docRef = await addDoc(
        collection(db, "users", user.uid, "privateChannel"),
        {
          channelName,
        }
      );
      dispatch(
        setChannelInfo({
          channelId: docRef.id,
          channelName,
        })
      );
    }
  };

  return (
    <nav className="hidden  flex-col bg-gray-800 p-2 font-semibold text-white md:flex md:w-1/5">
      <div className="flex items-center justify-between p-2 text-center text-white ">
        <h3 className="hidden md:flex md:text-lg">Chat List</h3>
      </div>
      {channels.map((channel) => {
        const test = channel.channel.channelName;
        return (
          <div
            className="flex cursor-pointer items-center gap-2 rounded-md py-2 pl-2 text-sm hover:bg-gray-700 sm:px-5"
            key={channel.id}
            onClick={() =>
              dispatch(
                setChannelInfo({
                  channelId: channel.id,
                  channelName: channel.channel.channelName,
                })
              )
            }
          >
            <Avatar src={characterImage[test]} sx={{ width: 24, height: 24 }} />
            <BsChatRight />
            <h4 className="hidden pb-1 md:flex">
              {channel.channel.channelName}
            </h4>
          </div>
        );
      })}
    </nav>
  );
};
