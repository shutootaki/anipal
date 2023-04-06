import { DocumentData } from "firebase/firestore";

export interface InitialUserState {
  displayName: string;
  photo: string | undefined;
  user: User;
  isLoading: boolean;
}

export interface InitialChannnelState {
  channelId: string | null;
  channelName: string | null;
}
export interface InitialKeyState {
  apiKey: string | null;
}

export type User = {
  uid: string;
  photoURL: string;
  email: string;
  displayName: string;
} | null;

export type Channel = {
  id: string;
  channel: DocumentData;
};

export type Prompt = {
  role: string;
  content: string;
};

export type Characters = [
  "ドラえもん",
  "うずまきナルト",
  "モンキー・D・ルフィ",
  "孫悟空",
  "バカボンのパパ",
  "一休さん"
];

export type CharacterImage = {
  [key: string]: string;
};
