import React from "react";
import "./index.css";

/**
 * NotificationContextState
 */

export type NotificationContextState = {
  setMessage: (msg: Message) => void,
};

/**
 * NotificationContext
 */

export const NotificationContext = React.createContext<NotificationContextState>({
  setMessage: () => {},
});

/**
 * NotificationContainerProps
 */

type Message = { title: string, message: string };
export type NotificationContainerProps = {
  anim: string,
  message?: Message | undefined,
};

/**
 * NotificationContainer
 */

export const NotificationContainer = (props: NotificationContainerProps) => {
  return (
    <>
      {props.message !== undefined &&
        <div className='absolute w-screen h-screen pointer-events-none'>
          <div
            className={`
              notification-container ${props.anim} relative w-[20rem]
              h-[4rem] flex justify-center items-center bg-[#CADDA8]
              flex flex-col rounded-xl shadow-xl p-2`}>

              <p className='w-full text-xs text-center'><strong>{props.message?.title ?? ""}</strong></p>
              <p className='w-full text-xs text-center flex-1'>

              {props.message?.message ?? ""}              
            </p>
          </div>
        </div>}
    </>
  );
};

/**
 * NotificationProvider
 */

export function NotificationProvider({ children }: React.PropsWithChildren) {
  const [anim, setAnim] = React.useState("");
  const [message, setMessage] = React.useState<Message|undefined>();

  React.useLayoutEffect(() => {
    if (message !== undefined && anim === "")
    {
      setAnim("start");
      setTimeout(() => {
        setAnim("end");
        setTimeout(() => {
          setMessage(undefined);
          setAnim("")
        }, 300);
      }, 2500);
    }
  }, [anim, message]);

  return (
    <NotificationContext.Provider value={{ setMessage }}>
      <NotificationContainer anim={anim} message={message} />
      <>{children}</>
    </NotificationContext.Provider>
  );
}

/**
 * useNotification hook.
 */

export const useNotification = () => {
  return React.useContext(NotificationContext).setMessage;
};