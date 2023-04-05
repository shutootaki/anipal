import { Prompt } from "../../../../utils/types";
import { systemPrompt } from "../functions/systemPrompts/systemPrompt";

export const getNarutoAI = async (
  prompt: string,
  userName: string | undefined,
  channelName: string | null,
  apiKey: string | null,
  narutoChatHistory: Prompt[],
  setNarutoChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
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
        Authorization: `Bearer ${apiKey}`,
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

    setNarutoChatHistory([
      ...narutoChatHistory,
      { role: "assistant", content: data.choices[0].message.content },
    ]);

    return data.choices[0].message.content;
  } catch (error: any) {
    return setError(
      "エラーが発生しました。しばらくしてからもう一度お試しください。"
    );
  }
};
