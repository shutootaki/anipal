import React, { useState } from "react";
import { getDraAI } from "../api/getDraAI";
import { addDocToCollection } from "../functions/addDocToCollection";
import { Prompt } from "../../../../utils/types";
import {
  CollectionReference,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { getGPT } from "../api/getGPT";

export const useCallGPT = () => {
  const [loading, setLoading] = useState(false);

  const callGPT = async (
    message: string,
    chatHistory: Prompt[],
    setChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const prompt = message.slice(4);
    const res = await getGPT(prompt, chatHistory, setChatHistory);
    addDocToCollection(collectionRef, {
      message: res,
      timeStamp: serverTimestamp(),
      user: "AI",
      userImage:
        "https://illust8.com/wp-content/uploads/2019/11/computer_ai_5679.png",
    });
    setLoading(false);
  };

  const callDra = async (
    message: string,
    userName: string | undefined,
    draChatHistory: Prompt[],
    setDraChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const prompt = message.slice(4);
    const res = await getDraAI(
      prompt,
      userName,
      draChatHistory,
      setDraChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "ドラえもんAI",
      userImage:
        "https://thumb.ac-illust.com/ed/ed523fd6ea04642139061649aab5376d_t.jpeg",
    });
    setLoading(false);
  };
  return { callGPT, callDra, loading };
};
