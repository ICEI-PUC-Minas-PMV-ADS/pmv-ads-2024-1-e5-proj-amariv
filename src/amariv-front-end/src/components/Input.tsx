import React from "react";

/**
 * InputProps
 */

export type InputProps = React.ComponentProps<"input"> & {
  label: string;
};

/**
 * Input
 */

export const Input = React.forwardRef(
  ({ label, ...props }: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    return (
      <div className="flex flex-col w-full my-2 ">
        <label className=" mb-[.5rem] ml-[.75rem] text-[#666666] text-xs">
          {label}
        </label>
        <input
          {...props}
          ref={ref}
          className="w-[220px] mb-[.5rem] py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646]"
        />
      </div>
    );
  }
);
