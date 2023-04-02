import { BsChatRight, BsTrash3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { characters } from "../../../utils/constants";

export const ChatHeader = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const channel = useSelector((state: RootState) => state.channel);

  const { channelName, channelId } = channel;

  const handleDeleteClick = async () => {
    try {
      const docRef = doc(
        db,
        "users",
        String(user?.uid),
        "privateChannel",
        String(channelId)
      );
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
      <h3 className="text-md flex items-center gap-3 text-center font-bold tracking-tight sm:text-left sm:text-xl">
        <BsChatRight />
        {channelName}
      </h3>
      {!characters.includes(channelName) && (
        <BsTrash3
          onClick={handleDeleteClick}
          size={20}
          className="mr-2 cursor-pointer hover:text-red-400"
        />
      )}
    </header>
  );
};
