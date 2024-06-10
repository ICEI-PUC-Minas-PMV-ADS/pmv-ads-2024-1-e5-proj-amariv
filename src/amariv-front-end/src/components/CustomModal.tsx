import { Modal } from "@mui/material";
import TopBar from "./re_components/TopBar";
import React from "react";

type props = {
  title?: string
  isOpen: boolean,
  onCancel: () => void
}

/**
 * CustomModal
 */

function CustomModal({ title = "Selecionar", isOpen, onCancel, children }: React.PropsWithChildren<props>) {
  const rootRef = React.useRef<HTMLDivElement>(null);

  /**
   * Events
   */

  const handleBackgroundClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    const node = event.target as Node;
    if (node.contains(rootRef.current)) {
      onCancel();
    }
  }, [onCancel]);

  /**
   * Layout
   */

  return (
    <Modal open={isOpen} className="overflow-y-scroll" onClose={onCancel}>
      <div>
        <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(0,0,0,0.4)] lg:py-6" onClick={handleBackgroundClick}>
          <div ref={rootRef} className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
            <TopBar title={title} OnClickBack={onCancel} />
            <div className="w-full flex flex-col gap-2 px-4 py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;