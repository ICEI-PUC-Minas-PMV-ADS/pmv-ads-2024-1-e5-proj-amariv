import React from "react";
import AmarivLogo from '../assets/amariv_logo.png';

/**
 * LoadingProps
 */

export type LoadingProps = {
  isLoading: boolean,
};

/**
 * Loading
 */

export function Loading({ isLoading, children }: React.PropsWithChildren<LoadingProps>) {
  return (
    <React.Fragment>
      {isLoading ? <LoadingViewer /> : children}
    </React.Fragment>
  );
}

function LoadingViewer() {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-[#E8F4EB]">
      <div className="w-[3rem] h-[3rem]">
        <img src={AmarivLogo} alt="logo" />
      </div>
    </div>
  );
}