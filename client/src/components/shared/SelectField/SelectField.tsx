import React, { ComponentProps } from "react";
type SelectFieldProps = {
  options: { label: string; value: string }[];
} & ComponentProps<"select">;

const SelectField: React.FC<SelectFieldProps> = ({ options, ...props }) => {
  return (
    <select {...props}>
      {options.map((option, index) => (
        <option
          key={`option-${props.name || "select_field"}-${index}`}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
