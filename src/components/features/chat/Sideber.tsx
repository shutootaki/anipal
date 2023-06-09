import { addDoc, collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import { onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setChannelInfo } from "../../../store/channelSlice";
import { Channel } from "../../../utils/types";
import { RootState } from "../../../store/store";
import { Avatar } from "@mui/material";
import { characterImage } from "../../../utils/constants";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Profile } from "../userSetting/Profile";

export const Sidebar = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const user = useSelector((state: RootState) => state.user.user);
  const apiKey = useSelector((state: RootState) => state.key.apiKey);
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
    <nav className="relative  hidden flex-col bg-gray-800 p-2 font-semibold text-white md:flex md:w-1/5">
      <div className="flex items-center justify-between p-2 text-center text-white ">
        <h3 className="hidden items-center gap-1 md:flex md:text-lg">
          <AiOutlineUnorderedList />
          Chat List
        </h3>
      </div>
      {channels.map((channel) => {
        const channelName = channel.channel.channelName;
        return (
          <div
            className={
              apiKey || channelName === "ドラえもん"
                ? "flex cursor-pointer items-center gap-2 rounded-md py-2 pl-2 text-sm hover:bg-gray-700 sm:px-5"
                : "flex cursor-pointer items-center gap-2 rounded-md py-2 pl-2 text-sm text-gray-600 sm:px-5"
            }
            key={channel.id}
            onClick={() =>
              dispatch(
                setChannelInfo({
                  channelId: channel.id,
                  channelName,
                })
              )
            }
          >
            <Avatar
              src={characterImage[channelName]}
              sx={{ width: 32, height: 32 }}
            />
            <h4 className="hidden pb-1 md:flex">
              {channel.channel.channelName}
            </h4>
          </div>
        );
      })}
      <Profile />
    </nav>
  );
};
