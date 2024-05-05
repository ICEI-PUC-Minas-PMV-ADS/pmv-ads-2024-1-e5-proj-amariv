import React from "react";

export type DropdownInputProps = React.ComponentProps<"select"> & {
  label: string;
  options: string[]; // Lista de opções disponíveis
  placeholder: string;
};

export const DropdownInput = React.forwardRef(
  (
    { label, options, placeholder, ...props }: DropdownInputProps,
    ref: React.LegacyRef<HTMLSelectElement>
  ) => {
    if (!placeholder) {
      throw new Error("O prop 'placeholder' é obrigatório para DropdownInput.");
    }

    return (
      <div className="flex flex-col w-full my-2">
        <label className="mb-[.5rem] ml-[.75rem] text-[#666666] text-xs">
          {label}
        </label>
        <select
          {...props}
          ref={ref}
          className="w-[220px] m-[15px] py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646]"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
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
