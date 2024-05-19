import React from 'react';
import IcHome from './assets/ic_home.svg';
import IcRoutes from './assets/ic_routes.svg';
import IcHistory from './assets/ic_history.svg';
import IcHomeSel from './assets/ic_home_sel.svg';
import IcRoutesSel from './assets/ic_routes_sel.svg';
import IcHistorySel from './assets/ic_history_sel.svg';
import { useNavigate } from 'react-router-dom';

/**
 * BottomNavProps
 */

export type BottomNavProps = {};

/**
 * BottomNav
 */

export function BottomNav(props: BottomNavProps) {
  const navigate = useNavigate();
  const isCurrentRoute = React.useCallback((route: string) => route === window.location.pathname, []);

  /**
   * Events
   */

  const handleChangeRoute = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const targetRoute = event.currentTarget.getAttribute("data-route");
    if (targetRoute) {
      navigate(targetRoute, { replace: true });
    }
  }, [navigate]);

  /**
   * Layout
   */

  return (
    <div className="flex flex-row pb-6 justify-center items-center w-full py-2 px-6 bg-[#53735B]">
      <div className='flex flex-col flex-1 justify-center items-center' onClick={handleChangeRoute} data-route="/">
        <img src={isCurrentRoute("/") ? IcHomeSel : IcHome} className='w-[2rem]' alt="" />
        <p className='text-[0.6rem]' style={{ color: isCurrentRoute("/") ? "#CADDA8" : "#E8F4EB" }}>Início</p>
      </div>
      <div className='flex flex-col flex-1 justify-center items-center' onClick={handleChangeRoute} data-route="/routes">
        <img src={isCurrentRoute("/routes") ? IcRoutesSel : IcRoutes} className='w-[2rem]' alt="" />
        <p className='text-[0.6rem]' style={{ color: isCurrentRoute("/routes") ? "#CADDA8" : "#E8F4EB" }}>Rotas</p>
      </div>
      <div className='flex flex-col flex-1 justify-center items-center' onClick={handleChangeRoute} data-route="/history">
        <img src={isCurrentRoute("/history") ? IcHistorySel : IcHistory} className='w-[2rem]' alt="" />
        <p className='text-[0.6rem]' style={{ color: isCurrentRoute("/history") ? "#CADDA8" : "#E8F4EB" }}>Histórico de coletas</p>
      </div>
    </div>
  );
}