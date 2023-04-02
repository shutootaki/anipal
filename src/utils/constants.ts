import { CharacterImage } from "./types";
export const publicUrl = "https://anipal.versel.com";

export const characters: String[] = [
  "ドラえもん",
  "うずまきナルト",
  "モンキー・D・ルフィ",
  "孫悟空",
  "バカボンのパパ",
  "一休さん",
];

export const characterImage: CharacterImage = {
  ドラえもん: `${publicUrl}/assets/doraemon.png`,
  うずまきナルト: `${publicUrl}/assets/naruto.png`,
  "モンキー・D・ルフィ": `${publicUrl}/assets/luffy.png`,
  孫悟空: `${publicUrl}/assets/goku.png`,
  バカボンのパパ: `${publicUrl}/assets/bakabon.png`,
  一休さん: `${publicUrl}/assets/ikkyuu.png`,
};
