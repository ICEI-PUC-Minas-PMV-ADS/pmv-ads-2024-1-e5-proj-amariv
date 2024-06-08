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

export function Button2({ label, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "w-full py-3 bg-[#53735b] text-white rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#53735b] focus:ring-opacity-50",
        props.className
      )}
    >
      {label}
    </button>
  );
}


