import React from 'react';

/**
 * FormProps
 */

export type FormProps = React.ComponentProps<'form'>;

/**
 * Form
 */
export function Form({ ...props }: FormProps) {
  return <form {...props} className='w-full flex flex-col items-center' />;
}