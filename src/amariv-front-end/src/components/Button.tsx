import React from 'react';
import {twMerge} from 'tailwind-merge';

/**
 * ButtonProps
 */

export type ButtonProps = React.ComponentProps<'button'> & {
  label: string,
};

/**
 * Button
 */

export function Button({ label, ...props}: ButtonProps) {
  return (
    <button {...props}
      className={twMerge('w-full py-4 bg-[#CADDA8] text-[#53735B] rounded-lg active:bg-[#AABD88]', props.className)}
    >{label}</button>
  );
}