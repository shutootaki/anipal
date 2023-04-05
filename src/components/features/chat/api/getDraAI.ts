import { Prompt } from "../../../../utils/types";
import { systemPrompt } from "../functions/systemPrompts/systemPrompt";

export const getDraAI = async (
  prompt: string,
  userName: string | undefined,
  channelName: string | null,
  apiKey: string | null,
  draChatHistory: Prompt[],
  setDraChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>
) => {
  const message = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: draChatHistory.length
      ? [
          systemPrompt(userName, channelName),
          ...draChatHistory.slice(-2),
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

  setDraChatHistory([
    ...draChatHistory,
    { role: "assistant", content: data.choices[0].message.content },
  ]);

  return data.choices[0].message.content;
};
