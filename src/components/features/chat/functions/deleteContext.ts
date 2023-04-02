import React from "react";
import { Prompt } from "../../../../utils/types";

export const deleteContext = (
  e: React.MouseEvent<HTMLElement>,
  chatHistoryForDeletion: (chatHistory: Prompt[]) => void
) => {
  e.preventDefault();
  chatHistoryForDeletion([]);
};
