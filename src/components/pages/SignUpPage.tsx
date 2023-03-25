import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Button } from "../ui/Button";
import { onSubmitSignUp } from "../features/auth/onSubmitSignUp";
import { Spinner } from "../ui/Spinner";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && setPhoto(event.target.files[0]);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-800 ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-600">
      <div className="mb-10 flex  w-10/12 rounded-lg bg-white px-8 py-4 shadow-lg md:p-8	lg:w-6/12">
        <form
          className="w-full"
          onSubmit={(event) =>
            onSubmitSignUp(
              event,
              name,
              photo,
              email,
              password,
              navigate,
              setLoading
            )
          }
        >
          <div className="mb-2 flex flex-col items-center justify-center md:mb-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
            />
            <p className="mb-1 font-bold">Your Avatar</p>
            <Avatar
              src={photo ? URL.createObjectURL(photo) : ""}
              sx={{ width: 70, height: 70 }}
              alt="user-profile-photo"
              className="cursor-pointer"
              onClick={handleAvatarClick}
            />
          </div>
          <div className="mb-3 md:mb-6">
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 p-2 text-xs  md:text-lg"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-3 md:mb-6">
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 p-2 text-xs  md:text-lg"
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="mb:mb-10 mb-4">
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-lg border border-gray-400 p-2 text-xs  md:text-lg"
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex-col items-center justify-between text-center md:flex">
            <Button className="mb-4 rounded-lg bg-purple-600 py-2 px-6 text-lg font-bold text-white hover:bg-purple-700">
              Sign Up
            </Button>
            <a
              className="inline-block cursor-pointer font-semibold text-blue-600 hover:underline dark:text-blue-500"
              onClick={() => navigate("/sign-in")}
            >
              Sign In はこちらから
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
