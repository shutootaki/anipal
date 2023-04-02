import { Sidebar } from "../features/chat/Sideber";
import { ChatArea } from "../features/chat/ChatArea";

export const ChatPage = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <ChatArea />
    </div>
  );
};
