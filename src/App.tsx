import { ChatPage } from "./components/pages/ChatPage";
import { SignInPage } from "./components/pages/SignInPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./utils/firebase";
import { useDispatch } from "react-redux";
import { login, logout, startLoading } from "./store/userSlice";
import { RootState } from "./store/store";
import { Spinner } from "./components/ui/Spinner";

export default function App() {
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    auth.onAuthStateChanged((loginuser) => {
      if (loginuser) {
        dispatch(
          login({
            uid: loginuser.uid,
            email: loginuser.email,
            displayName: loginuser.displayName,
            photoURL: loginuser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-800">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="App h-full pt-12">
      {user ? <ChatPage /> : <SignInPage />}
    </div>
  );
}
