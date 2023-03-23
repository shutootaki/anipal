import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatInput } from "./ChatInput";

export const ChatArea = () => {
  return (
    <div className="flex h-screen w-full grow flex-col bg-gray-700">
      <ChatHeader />
      <ChatBody />
      <ChatInput />
    </div>
  );
};
