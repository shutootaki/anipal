import { Prompt } from "../../../../utils/types";
import { systemPrompt } from "../functions/systemPrompts/systemPrompt";

export const getBakabonAI = async (
  prompt: string,
  userName: string | undefined,
  channelName: string | null,
  apiKey: string | null,
  bakabonChatHistory: Prompt[],
  setBakabonChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>
) => {
  const message = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: bakabonChatHistory.length
      ? [
          systemPrompt(userName, channelName),
          ...bakabonChatHistory.slice(-2),
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
      Authorization: `Bearer ${apiKey}`,
    },
    body: message,
  });
  const data = await res.json();

  setBakabonChatHistory([
    ...bakabonChatHistory,
    { role: "assistant", content: data.choices[0].message.content },
  ]);

  return data.choices[0].message.content;
};
