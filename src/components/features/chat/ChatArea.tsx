import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatInput } from "./ChatInput";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export const ChatArea = () => {
  const channel = useSelector((state: RootState) => state.channel);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="flex w-full grow flex-col bg-gray-700">
      <div className="h-90p pb-12">
        <ChatHeader />
        <ChatBody />
      </div>
      <ChatInput channel={channel} user={user} />
    </div>
  );
};
