import React from 'react';
import { VariantProps, tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

/**
 * Variants
 */

const button = tv({
  base: 'w-full rounded-lg',
  variants: {
    fontSize: {
      "small": 'py-2 px-4 text-[.65rem]',
      "medium": 'py-2 px-4 text-[.85rem]',
      "default": 'py-4',
    },
    color: {
      primary: 'bg-[#CADDA8] text-[#53735B] active:bg-[#AABD88] disabled:bg-[#666666] rounded-lg',
      secondary: 'bg-[#53735B] text-[#CADDA8] active:bg-[#43634B] disabled:bg-[#666666] rounded-2xl',
    }
  },
  defaultVariants: {
    fontSize: 'default',
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

export function Button({ label, color, fontSize, ...props }: ButtonProps) {
  return (
    <button {...props}
      className={twMerge(button({ color, fontSize }), props.className)}
    >{label}</button>
  );
}