import { Sidebar } from "../ui/Sideber";
import { ChatArea } from "../features/chat/ChatArea";

export const ChatPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ChatArea />
    </div>
  );
};
