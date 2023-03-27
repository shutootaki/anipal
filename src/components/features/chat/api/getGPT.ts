import { Prompt } from "../../../../utils/types";

export const getGPT = async (
  prompt: string,
  chatHistory: Prompt[],
  setChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>
) => {
  const simpleAI = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: chatHistory.length
      ? [...chatHistory.slice(-2), { role: "user", content: prompt }]
      : [{ role: "user", content: prompt }],
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: simpleAI,
  });
  const data = await res.json();

  setChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "assistant", content: data.choices[0].message.content },
  ]);

  return data.choices[0].message.content;
};
