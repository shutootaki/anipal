import { DocumentData } from "firebase/firestore";

export interface InitialUserState {
  displayName: string;
  photo: string | undefined;
  user: null | {
    uid: string;
    photoURL: string;
    email: string;
    displayName: string;
  };
  isLoading: boolean;
}

export interface InitialChannnelState {
  channelId: string | null;
  channelName: string | null;
}

export type Channel = {
  id: string;
  channel: DocumentData;
};

export type Prompt = {
  role: string;
  content: string;
};

export type Characters =
  | "ドラえもん"
  | "ラムちゃん"
  | "うずまきナルト"
  | "モンキー・D・ルフィ"
  | "孫悟空"
  | "空条承太郎"
  | "バカボンのパパ"
  | "神楽";
