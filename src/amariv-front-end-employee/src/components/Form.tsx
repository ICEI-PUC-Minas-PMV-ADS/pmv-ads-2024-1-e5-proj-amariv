import React from 'react';

/**
 * FormProps
 */

export type FormProps = React.ComponentProps<'form'>;

/**
 * Form
 */
export const Form = React.forwardRef(({ ...props }: FormProps, ref: React.Ref<HTMLFormElement>) => {
  return <form {...props} ref={ref} className='w-full flex flex-col items-center' />;
});