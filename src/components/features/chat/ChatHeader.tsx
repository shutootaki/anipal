import { BsChatRight, BsTrash3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export const ChatHeader = () => {
  const channelName = useSelector(
    (state: RootState) => state.channel.channelName
  );
  const channelId = useSelector((state: RootState) => state.channel.channelId);

  const handleDeleteClick = async () => {
    try {
      const docRef = doc(db, "channels", String(channelId));
      if (window.confirm("こちらのチャンネルを削除しますか？")) {
        await deleteDoc(docRef);
        window.location.reload();
      } else {
        return;
      }
    } catch (error) {
      alert(error);
    }
  };

  if (!channelName) return null;
  return (
    <header className="flex w-full items-center justify-between border-b border-dashed p-2 px-4 text-white">
      <h3 className="flex items-center gap-3 text-center text-xl font-bold tracking-tight sm:text-left">
        <BsChatRight />
        {channelName}
      </h3>
      <BsTrash3
        onClick={handleDeleteClick}
        size={20}
        className="mr-2 cursor-pointer hover:text-red-400"
      />
    </header>
  );
};
