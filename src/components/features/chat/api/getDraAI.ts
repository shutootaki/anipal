import { useSelector } from "react-redux";
import { Prompt } from "../../../../utils/types";
import { systemPrompt } from "../functions/systemPrompts/systemPrompt";
import { RootState } from "../../../../store/store";

export const getDraAI = async (
  prompt: string,
  userName: string | undefined,
  draChatHistory: Prompt[],
  setDraChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>
) => {
  const channelName = useSelector(
    (state: RootState) => state.channel.channelName
  );
  console.log(channelName);

  const doraemonAI = JSON.stringify({
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
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: doraemonAI,
  });
  const data = await res.json();

  setDraChatHistory((prevChatHistory) => [
    ...prevChatHistory,
    { role: "assistant", content: data.choices[0].message.content },
  ]);

  return data.choices[0].message.content;
};
