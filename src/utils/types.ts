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
