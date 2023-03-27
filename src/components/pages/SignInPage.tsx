import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { onSubmitSignIn } from "../features/auth/onSubmitSignIn";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="flex h-full items-center justify-center bg-gray-600">
      <div className="flex w-10/12 rounded-lg bg-white p-8	shadow-lg lg:w-6/12">
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
            <input
              className="w-full rounded-lg border border-gray-400 p-2 text-xs  md:text-lg"
              type="text"
              id="email"
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
            <input
              className="w-full rounded-lg border border-gray-400 p-2 text-xs  md:text-lg"
              type="password"
              id="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex flex-col items-center text-center">
            <Button className="mb-4 rounded-lg bg-teal-600 py-2 px-6 text-lg font-bold text-white hover:bg-teal-700">
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
