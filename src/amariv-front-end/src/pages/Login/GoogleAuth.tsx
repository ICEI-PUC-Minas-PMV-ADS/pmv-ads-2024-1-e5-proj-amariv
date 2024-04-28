import React from 'react';
import { EmailAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { fireAuth } from '../../AppFirebase';

/**
 * GoogleAuthProps
 */

export type GoogleAuthProps = {};

/**
 * GoogleAuth
 */

export function GoogleAuth(props: GoogleAuthProps) {
  const signInWithGoogle = React.useCallback(async () => {
    const result = await signInWithPopup(fireAuth, new GoogleAuthProvider());
  }, []);
  return (
    <div></div>
  );
}