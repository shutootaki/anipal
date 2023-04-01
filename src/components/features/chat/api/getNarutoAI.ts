import { Prompt } from "../../../../utils/types";
import { systemPrompt } from "../functions/systemPrompts/systemPrompt";

export const getNarutoAI = async (
  prompt: string,
  userName: string | undefined,
  channelName: string | null,
  narutoChatHistory: Prompt[],
  setNarutoChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>
) => {
  const message = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: narutoChatHistory.length
      ? [
          systemPrompt(userName, channelName),
          ...narutoChatHistory.slice(-2),
          { role: "user", content: prompt },
        ]
      : [
          systemPrompt(userName, channelName),
          { role: "user", content: prompt },
        ],
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: message,
  });
  const data = await res.json();

  setNarutoChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "assistant", content: data.choices[0].message.content },
  ]);

  return data.choices[0].message.content;
};
