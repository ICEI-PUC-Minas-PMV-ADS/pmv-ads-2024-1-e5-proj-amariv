import React from "react";

export type DropdownInputProps = React.ComponentProps<"select"> & {
  label: string;
  options: string[]; // Lista de opções disponíveis
  placeholder?: string; // Placeholder opcional
};

export const DropdownInput = React.forwardRef(
  (
    { label, options, placeholder = "", ...props }: DropdownInputProps,
    ref: React.LegacyRef<HTMLSelectElement>
  ) => {
    return (
      <div className="flex flex-col w-full my-4">
        <label className="mb-2 ml-2 text-[#666666] text-sm">{label}</label>
        <select
          {...props}
          ref={ref}
          className="w-full py-2 px-4 rounded-[30px] bg-[#FBFFF3] border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default DropdownInput;