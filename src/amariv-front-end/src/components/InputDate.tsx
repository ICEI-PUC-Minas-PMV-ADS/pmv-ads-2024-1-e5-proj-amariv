import React from "react";

export type InputProps = React.ComponentProps<"input"> & {
  label: string;
};

export const InputDate = React.forwardRef(
  ({ label, ...props }: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    const isDateInput = props.type === "date";

    // Renderiza um input de data nativo se o tipo for "date"
    if (isDateInput) {
      return (
        <div className="flex flex-col w-full my-2">
          <label className="mb-[.5rem] ml-[.75rem] text-[#666666] text-xs">
            {label}
          </label>
          <input
            {...props}
            ref={ref}
            type="date"
            className="max-w-[250px] m-[15px] py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646]"
          />
        </div>
      );
    }

    // Renderiza um input de texto padrão se o tipo não for "date"
    return (
      <div className="flex flex-col w-full my-2">
        <label className="mb-[.5rem] ml-[.75rem] text-[#666666] text-xs">
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          className="max-w-[250px] m-[15px] py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646]"
        />
      </div>
    );
  }
);
