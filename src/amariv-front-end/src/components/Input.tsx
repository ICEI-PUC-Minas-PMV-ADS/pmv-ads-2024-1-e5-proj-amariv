import React from 'react';

/**
 * InputProps
 */

export type InputProps = React.ComponentProps<'input'> & {
  label: string,
  error?: string,
};

/**
 * Input
 */

export const Input = React.forwardRef(({ label, error, ...props}: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
  return (
    <div className='flex flex-col w-full my-4'>
      <label className='mb-2 ml-2 text-[#666666] text-sm'>{label}</label>
      <input {...props} ref={ref} className='py-2 px-4 rounded-[30px] rounded-md bg-[#FBFFF3] border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]' />
      {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
    </div>
  );
})