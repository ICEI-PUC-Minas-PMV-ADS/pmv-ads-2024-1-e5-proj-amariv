import React from 'react';

/**
 * InputProps
 */

export type InputProps = React.ComponentProps<'input'> & {
  label: string,
  labelColor?: string,
  error?: string,
};

/**
 * Input
 */

export const Input = React.forwardRef(({ label, error, labelColor = '#E8F4EB', ...props}: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <div className='flex flex-col w-full my-2'>
      <label className={`mb-[.5rem] ml-[.75rem] text-xs`} style={{color: labelColor}}>{label}</label>
      <input {...props} ref={ref} className='py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646]' />
      <p className='text-red-500 text-center text-sm'>{error}</p>
    </div>
  );
});