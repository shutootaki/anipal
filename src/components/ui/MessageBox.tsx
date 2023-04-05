import { AlertTitle, Alert } from "@mui/material";
import { FC, ReactNode } from "react";

type MessageBoxProps = {
  title: string;
  children: ReactNode;
};

export const MessageBox: FC<MessageBoxProps> = ({ title, children }) => {
  return (
    <Alert severity="warning">
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
};
