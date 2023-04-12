import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Button } from "../ui/Button";
import { onSubmitSignUp } from "../features/auth/onSubmitSignUp";
import { Spinner } from "../ui/Spinner";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useMobile } from "../../hooks/useMobile";

export const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File>();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useMobile();

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
      <div className="flex h-full items-center justify-center bg-gray-800 ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center bg-gray-600">
      <div className="flex w-10/12 rounded-lg bg-white px-8 py-4 shadow-lg lg:w-5/12 lg:px-12 lg:py-8">
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
          <div className="flex flex-col items-center justify-center md:mb-4">
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
            <OutlinedInput
              className={
                isMobile
                  ? "max-h-9 w-full rounded-lg border border-gray-400 text-sm md:text-lg"
                  : "max-h-11 w-full rounded-lg border border-gray-400 p-2 text-sm md:text-lg"
              }
              type="text"
              id="name"
              size="small"
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
            <OutlinedInput
              className={
                isMobile
                  ? "max-h-9 w-full rounded-lg border border-gray-400 text-sm md:text-lg"
                  : "max-h-11 w-full rounded-lg border border-gray-400 p-2 text-sm md:text-lg"
              }
              type="text"
              id="email"
              size="small"
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
            <OutlinedInput
              className={
                isMobile
                  ? "max-h-9 w-full rounded-lg border border-gray-400 p-2 text-sm md:text-lg"
                  : "max-h-11 w-full rounded-lg border border-gray-400 p-2 text-sm md:text-lg"
              }
              type={showPassword ? "text" : "password"}
              id="password"
              size="small"
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <Button className="mb-4 rounded-lg bg-teal-600 px-6 py-2 text-lg font-bold text-white hover:bg-teal-700">
              Sign Up
            </Button>
            <a
              className="inline-block cursor-pointer text-sm font-semibold text-blue-700 hover:underline "
              onClick={() => navigate("/sign-in")}
            >
              Sign In はこちらから→
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
