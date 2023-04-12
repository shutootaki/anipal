import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { onSubmitSignIn } from "../features/auth/onSubmitSignIn";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useMobile } from "../../hooks/useMobile";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isMobile } = useMobile();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-600">
      <div className="flex w-10/12 rounded-lg bg-white p-8 shadow-lg lg:w-5/12 lg:p-12">
        <form
          className="w-full"
          onSubmit={(event) => onSubmitSignIn(event, email, password, navigate)}
        >
          <div className="mb-6 ">
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
          <div className="mb-6">
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <OutlinedInput
              className={
                isMobile
                  ? "max-h-9 w-full rounded-lg border border-gray-400 text-sm md:text-lg"
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
              Sign In
            </Button>
            <a
              className="inline-block cursor-pointer text-sm font-semibold text-blue-700 hover:underline"
              onClick={() => navigate("/sign-up")}
            >
              Sign Upはこちらから→
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
