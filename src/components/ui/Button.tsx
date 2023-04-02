import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={
        className
          ? className
          : "flex items-center justify-center space-x-2 rounded-full bg-teal-600 px-4 py-1  font-bold text-white shadow-md transition-colors hover:bg-teal-700"
      }
      onClick={onClick}
    >
      <p className="text-sm">{children}</p>
    </button>
  );
};
