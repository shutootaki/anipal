import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "../../../utils/firebase";
import { NavigateFunction } from "react-router-dom";

export const onSubmitSignIn = async (
  event: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  navigate: NavigateFunction
) => {
  event.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
  } catch (error) {
    alert(error);
  }
};
