import React from 'react';
import { isDesktop } from 'react-device-detect';
import { tv } from 'tailwind-variants';

/**
 * Variants
 */
const modal = tv({
  base: 'bg-amariv flex-col flex justify-center items-center p-2',
  variants: {
    size: {
      sm: 'w-[15rem] h-[6rem]',
      md: 'w-[20rem] h-[8rem]',
      lg: 'w-[25rem] h-[10rem]',
    }
  },
  defaultVariants: {
    size: isDesktop ? 'md' : 'sm',
  }
});

/**
 * AlertModalProps
 */

export type AlertModalProps = {
  title?: string;
  message?: string;
  onDismiss?: () => void;
};

/**
 * AlertModal
 */

export function AlertModal({title, message, onDismiss, children}: React.PropsWithChildren<AlertModalProps>) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  /**
   * Events
   */

  const handleClick = React.useCallback((evt: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current) {
      if (evt.target === modalRef.current || modalRef.current.contains(evt.target as Node)) {
        onDismiss?.();
      }
    }
  }, [modalRef, onDismiss]);

  /**
   * Layout
   */

  return (
    <>
      {(title !== undefined || message !== undefined) && (
        <div ref={modalRef} className='w-full h-full flex justify-center items-center bg-[#00000090] absolute zIndex-10' onClick={handleClick}>
          <div className={modal()}>
            {title !== undefined && <p className='text-red-500 cursor-arrow text-center'><strong>{title}</strong></p>}
            {message !== undefined && <p className='text-red-500 cursor-arrow text-center'>{message}</p>}
          </div>
        </div>
      )}
      {children}
    </>
  );
}