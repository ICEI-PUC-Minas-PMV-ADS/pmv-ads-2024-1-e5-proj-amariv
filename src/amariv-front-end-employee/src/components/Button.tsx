import React from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

/**
 * Variants
 */

const button = tv({
  base: 'w-full',
  variants: {
    color: {
      primary: 'py-3 bg-[#CADDA8] text-[#53735B] active:bg-[#AABD88]',
      secondary: 'py-3 bg-[#53735B] text-[#CADDA8] active:bg-[#43634B]',
    },
    rounded: {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xg: 'rounded-2xl',
    }
  },
  defaultVariants: {
    color: 'primary',
    xg: '2xl',
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

export function Button({ label, color, rounded, ...props }: ButtonProps) {
  return (
    <button {...props}
      className={twMerge(button({ color, rounded }), props.className)}
    >{label}</button>
  );
}