import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * ButtonProps
 */

export type ButtonProps = React.ComponentProps<"button"> & {
  label: string;
};

/**
 * Button
 */

export function Button3({ label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "w-full py-3 bg-[#E36C6C] text-white rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E36C6C] focus:ring-opacity-50",
        props.className
      )}
    >
      {label}
    </button>
  );
}