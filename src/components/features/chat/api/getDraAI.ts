import { Prompt } from "../../../../utils/types";
import { DRA_PROMPT } from "../../../../utils/constants";

export const getDraAI = async (
  prompt: string,
  userName: string | undefined,
  draChatHistory: Prompt[],
  setDraChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>
) => {
  const doraemonAI = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: draChatHistory.length
      ? [
          DRA_PROMPT(userName),
          ...draChatHistory.slice(-2),
          { role: "user", content: prompt },
        ]
      : [DRA_PROMPT(userName), { role: "user", content: prompt }],
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: doraemonAI,
  });
  const data = await res.json();

  setDraChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "assistant", content: data.choices[0].message.content },
  ]);
  console.log({ data: draChatHistory });

  return data.choices[0].message.content;
};
