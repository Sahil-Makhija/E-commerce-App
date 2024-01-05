import { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

const NextActionButton: React.FC<{
  buttonText: string|ReactElement;
  onClick?: () => void;
  className?:string;
}> = ({ buttonText, onClick = () => null,className="" }) => {
  return (
    <button
      onClick={onClick}
      className={twMerge("rounded-md bg-primary text-semibold border-transparent hover:bg-white border-2 hover:border-primary text-white hover:text-primary duration-300 p-3 ease-in-out",className)}
    >
      {buttonText}
    </button>
  );
};

export default NextActionButton