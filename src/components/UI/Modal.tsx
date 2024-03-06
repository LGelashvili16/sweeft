import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => {
  const modalElement = document.getElementById('modal');
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    modal?.showModal();
    return () => {
      // modal?.close();
    };
  }, []);

  if (!modalElement) {
    return null;
  }

  return createPortal(
    <dialog
      className={classes.modal}
      ref={dialog}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialog.current?.close();
        }
      }}
    >
      {children}
    </dialog>,
    modalElement
  );
};

export default Modal;
