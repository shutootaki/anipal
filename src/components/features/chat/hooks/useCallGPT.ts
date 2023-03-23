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
    console.log("prompt", prompt);
    const res = await getGPT(prompt, chatHistory, setChatHistory);
    console.log(res);
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
    draChatHistory: Prompt[],
    setDraChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const prompt = message.slice(4);
    const res = await getDraAI(prompt, draChatHistory, setDraChatHistory);
    addDocToCollection(collectionRef, {
      message: res,
      timeStamp: serverTimestamp(),
      user: "ドラえもんAI",
      userImage:
        "https://thumb.ac-illust.com/ed/ed523fd6ea04642139061649aab5376d_t.jpeg",
    });
    setLoading(false);
  };
  return { callGPT, callDra, loading };
};
