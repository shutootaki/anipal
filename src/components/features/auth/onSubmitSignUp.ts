import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { auth, db, storage } from "../../../utils/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { NavigateFunction } from "react-router-dom";

export const onSubmitSignUp = async (
  event: React.FormEvent<HTMLFormElement>,
  name: string,
  photo: File | undefined,
  email: string,
  password: string,
  navigate: NavigateFunction,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  event.preventDefault();
  setLoading(true);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const storageRef = ref(storage, `${name}: ${res.user.uid}`);
    await uploadBytesResumable(storageRef, photo as File).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(res.user, {
            displayName: name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName: name,
            email,
            photoURL: downloadURL,
          });
          await addDoc(
            collection(db, "users", res.user.uid, "privateChannel"),
            {
              channelName: "ドラえもん",
            }
          );
          setLoading(false);
          navigate("/");
        } catch (err) {
          setLoading(false);
          alert(err);
        }
      });
    });
  } catch (err) {
    alert(err);
  }
};
