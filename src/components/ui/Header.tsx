import { Button } from "./Button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { RootState } from "../../store/store";
import { auth, db } from "../../utils/firebase";
import { HamburgerMenu } from "./HamburgerMenu";
import { Channel } from "../../utils/types";
import { addDocToCollection } from "../features/chat/functions/addDocToCollection";
import { AiOutlineHeart } from "react-icons/ai";

export const Header = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [channels, setChannels] = useState<Channel[]>([]);

  const q = query(collection(db, "channels"));

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
    if (channelName) {
      addDocToCollection(collection(db, "channels"), { channelName });
    }
  };

  return (
    <header className="absolute flex h-12 w-full items-center justify-between gap-2 border-b bg-gray-700 px-3 text-white">
      <div className="flex">
        {user && (
          <div className="z-10 block md:hidden">
            <HamburgerMenu channels={channels} addChannel={addChannel} />
          </div>
        )}
        <div className="flex items-center justify-center text-center text-2xl font-bold">
          <AiOutlineHeart />
          AniPal
        </div>
      </div>
      {user && <Button onClick={() => auth.signOut()} children="Sign Out" />}
    </header>
  );
};
