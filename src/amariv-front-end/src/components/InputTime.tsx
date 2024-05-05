import React from "react";

export type InputTimeProps = React.ComponentProps<"input"> & {
  label: string;
};

export const InputTime = React.forwardRef(
  (
    { label, ...props }: InputTimeProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    const isTimeInput = props.type === "time";

    // Renderiza um input de hora nativo se o tipo for "time"
    if (isTimeInput) {
      return (
        <div className="flex flex-col w-full my-2">
          <label className="mb-[.5rem] ml-[.75rem] text-[#666666] text-xs">
            {label}
          </label>
          <input
            {...props}
            ref={ref}
            type="time"
            className="max-w-[250px] m-[15px] py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646]"
          />
        </div>
      );
    }

    // Renderiza um input de texto padrão se o tipo não for "time"
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

export default InputTime;
