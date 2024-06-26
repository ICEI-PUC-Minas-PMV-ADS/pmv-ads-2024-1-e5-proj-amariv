import React from "react";

export type DropdownInputProps = React.ComponentProps<"select"> & {
  label: string;
  options: { id: number, desc: string }[]; // Lista de opções disponíveis
  placeholder?: string; // Placeholder opcional
};

export const DropdownCombo = React.forwardRef(
  (
    { label, options, placeholder = "", ...props }: DropdownInputProps,
    ref: React.LegacyRef<HTMLSelectElement>
  ) => {
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
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.desc}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default DropdownCombo;
