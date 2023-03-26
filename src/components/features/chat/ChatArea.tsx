import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatInput } from "./ChatInput";

export const ChatArea = () => {
  return (
    <div className="flex w-full grow flex-col bg-gray-700">
      <div className="h-90p pb-12">
        <ChatHeader />
        <ChatBody />
      </div>
      <ChatInput />
    </div>
  );
};
