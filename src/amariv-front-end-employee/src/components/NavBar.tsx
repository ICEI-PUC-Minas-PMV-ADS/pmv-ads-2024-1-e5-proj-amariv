import { ReactElement } from "react";
import { NavBarItem } from './NavBarItem';
import { isDesktop } from "react-device-detect";
import AmarivLogo from '../assets/images/amariv_logo.png';
import { Spacer } from "./Spacer";

/**
 * NavBarProps
 */
export type NavBarProps = {
  title: string,
  children?: ReactElement<typeof NavBarItem> | Array<ReactElement<typeof NavBarItem>>,
};

/**
 * NavBar
 */

export function NavBar({ title, children }: NavBarProps) {
  return (
    <div className="w-full h-[4rem] bg-[#53735B] flex flex-row justify-between items-center px-4">
      <div className="flex flex-row justify-center items-center">
        {isDesktop && <img src={AmarivLogo} alt="logo" className="w-[3rem] h-[2rem]" />}
        {isDesktop && <Spacer width="1rem" />}
        <h3 className="text-2xl text-[#FFFFFF] font-semibold">{title}</h3>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}