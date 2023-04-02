import React, { FC, useState } from "react";
import { getDraAI } from "../api/getDraAI";
import { addDocToCollection } from "../functions/addDocToCollection";
import { Prompt } from "../../../../utils/types";
import {
  CollectionReference,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { getGPT } from "../api/getGPT";
import { getNarutoAI } from "../api/getNarutoAI";
import { getGokuAI } from "../api/getGokuAI";
import { getLuffyAI } from "../api/getLuffyAI";
import { getIkkyuAI } from "../api/getIkkyuAI";
import { getBakabonAI } from "../api/getBakabonAI";
export const useCallGPT = (channelName: string | null) => {
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
    const res = await getDraAI(
      message,
      userName,
      channelName,
      draChatHistory,
      setDraChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "ドラえもんAI",
      userImage: "/assets/draemon.jpg",
    });
    setLoading(false);
  };

  const callNaruto = async (
    message: string,
    userName: string | undefined,
    narutoChatHistory: Prompt[],
    setNarutoChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const res = await getNarutoAI(
      message,
      userName,
      channelName,
      narutoChatHistory,
      setNarutoChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "うずまきナルト",
      userImage: "/assets/naruto.jpg",
    });
    setLoading(false);
  };

  const callGoku = async (
    message: string,
    userName: string | undefined,
    gokuChatHistory: Prompt[],
    setGokuChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const res = await getGokuAI(
      message,
      userName,
      channelName,
      gokuChatHistory,
      setGokuChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "孫悟空",
      userImage: "/assets/goku.jpg",
    });
    setLoading(false);
  };

  const callBakabon = async (
    message: string,
    userName: string | undefined,
    bakabonChatHistory: Prompt[],
    setBakabonChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const res = await getBakabonAI(
      message,
      userName,
      channelName,
      bakabonChatHistory,
      setBakabonChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "バカボンのパパ",
      userImage: "/assets/bakabon.jpg",
    });
    setLoading(false);
  };

  const callIkyuu = async (
    message: string,
    userName: string | undefined,
    ikyuuChatHistory: Prompt[],
    setIkyuuChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const res = await getIkkyuAI(
      message,
      userName,
      channelName,
      ikyuuChatHistory,
      setIkyuuChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "一休さん",
      userImage: "/assets/ikkyuu.jpg",
    });
    setLoading(false);
  };

  const callLuffy = async (
    message: string,
    userName: string | undefined,
    luffyChatHistory: Prompt[],
    setLuffyChatHistory: React.Dispatch<React.SetStateAction<Prompt[]>>,
    collectionRef: CollectionReference<DocumentData>
  ) => {
    setLoading(true);
    const res = await getLuffyAI(
      message,
      userName,
      channelName,
      luffyChatHistory,
      setLuffyChatHistory
    );
    message = res.replace(/\n/g, "<br/>");

    addDocToCollection(collectionRef, {
      message,
      timeStamp: serverTimestamp(),
      user: "モンキー・D・ルフィ",
      userImage: "/assets/luffy.jpg",
    });
    setLoading(false);
  };

  return {
    callGPT,
    callDra,
    callNaruto,
    callGoku,
    callBakabon,
    callIkyuu,
    callLuffy,
    loading,
  };
};
