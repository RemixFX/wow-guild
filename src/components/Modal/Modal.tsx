import { FC, MouseEventHandler, ReactNode } from "react";

const Modal:FC<{children: ReactNode, onClose: MouseEventHandler, title: string}> = ({ children, onClose, title }) => {
  return (
      <>
      <div className="overlay" onClick={onClose} />
      <div className='modal'>
      <h3 className="modal__header">{title}</h3>
      <div className="modal__inner">
        {children}
      </div>
    </div>
    </>
  )
}

export default Modal;
