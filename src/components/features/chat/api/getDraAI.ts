import { Prompt } from "../../../../utils/types";
import { systemPrompt } from "../functions/systemPrompts/systemPrompt";

export const getDraAI = async (
  prompt: string,
  userName: string | undefined,
  channelName: string | null,
  apiKey: string | null,
  draChatHistory: Prompt[],
  setDraChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>
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

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: message,
    });

    if (!apiKey) {
      return setError(
        "APIキーが設定されていません。設定画面からAPIキーを設定してください。"
      );
    }

    if (!res.ok) {
      setError(`API request failed with status ${res.status}`);
    }

    const data = await res.json();

    setDraChatHistory([
      ...draChatHistory,
      { role: "assistant", content: data.choices[0].message.content },
    ]);

    return data.choices[0].message.content;
  } catch (error: any) {
    return setError(
      "エラーが発生しました。しばらくしてからもう一度お試しください。"
    );
  }
};
