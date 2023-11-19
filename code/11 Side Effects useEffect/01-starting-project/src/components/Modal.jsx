import { useEffect } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children }) {
  const dialog = useRef();

  // only when this method is called, will the backdrop when modal is open be added
  // dialog.current.showModal();

  // dialog ref isn't set here yet on first render
  // if (open) {
  //   dialog.current.showModal();
  // } else {
  //   dialog.current.close();
  // }

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
