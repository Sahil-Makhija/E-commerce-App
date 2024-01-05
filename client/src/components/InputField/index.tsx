import React from "react";
import { twMerge } from "tailwind-merge";
interface InputFieldProps {
  label: string;
  inputType?: string | "number";
  value: string | number;
  setValue?: (val: string | number) => void;
  labelClass?: string;
  className?: string;
  useTextBox?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label = "Enter text here",
  inputType = "text",
  value,
  setValue = () => {
    return;
  },
  labelClass = "",
  className = "",
  useTextBox = false,
}) => {
  return (
    <>
      <div
        className={twMerge(
          "w-full h-10 font-neon overflow-visible  group  border-b-2 border-gray-300 flex flex-col relative items-end ",
          className
        )}
      >
        {!useTextBox && (
          <input
            onChange={(e) => setValue(e.target.value)}
            spellCheck="false"
            className="peer text-lg w-full bg-transparent absolute bottom-0 px-1"
            type={inputType}
            value={value ? value : ""}
          />
        )}
        {useTextBox && (
          <span
            spellCheck="false"
            className="peer text-lg w-full bg-transparent absolute bottom-0 px-1"
          >{value}</span>
        )}
        <span
          className={twMerge(
            "text-lg text-gray-300 w-full flex items-end   h-full duration-150 peer-focus:-translate-y-[80%] peer-focus:text-sm",
            `${
              !Number.isNaN(value) &&
              value !== 0 &&
              value !== "" &&
              "-translate-y-[80%] text-sm"
            }`,
            labelClass
          )}
        >
          {label}
        </span>
      </div>
    </>
  );
};

export default InputField;
