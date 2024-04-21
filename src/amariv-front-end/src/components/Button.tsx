import React from 'react';
import {VariantProps, tv} from 'tailwind-variants';
import {twMerge} from 'tailwind-merge';

/**
 * Variants
 */

const button = tv({
  base: 'w-full rounded-lg',
  variants: {
    color: {
      primary: 'py-4 bg-[#CADDA8] text-[#53735B] active:bg-[#AABD88] rounded-lg',
      secondary: 'py-4 bg-[#53735B] text-[#CADDA8] active:bg-[#43634B] rounded-2xl',
    }
  },
  defaultVariants: {
    color: 'primary',
  }
});

/**
 * ButtonProps
 */

export type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof button> & {
  label: string,
};

/**
 * Button
 */

export function Button({ label, color = 'primary', ...props}: ButtonProps) {
  return (
    <button {...props}
      className={twMerge(button({color}), props.className)}
    >{label}</button>
  );
}