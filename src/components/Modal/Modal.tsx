import { FC, MouseEvent, ReactNode, RefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { adminSlice } from "../../store/reducers/adminSlice";
import { scheduleSlice } from "../../store/reducers/scheduleSlice";

const Modal: FC<{ children: ReactNode, title: string }> = ({ children, title }) => {

  const modal: RefObject<HTMLDialogElement> = useRef(null)
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { openLoginForm, openRegisterForm } = useAppSelector(state => state.admin)
  const { openEventForm } = useAppSelector(state => state.schedule)

  useEffect(() => {
    openLoginForm || openRegisterForm || openEventForm ? modal.current?.showModal() : modal.current?.close();
  }, [openLoginForm, openRegisterForm, openEventForm])

  const closeOnBackDropClick = (evt: MouseEvent<HTMLElement>) => {
    if (evt.target === modal.current) {
      modal.current?.close();
    }
  }

  modal.current?.addEventListener('close', () => {
    dispatch(scheduleSlice.actions.iscloseEventForm())
    dispatch(adminSlice.actions.isCloseForm())

  })

  return (
    <dialog className={`modal ${(location.pathname === '/schedule'
      || location.pathname === '/brackets') && 'modal_style_gold'}`}
      ref={modal} onClick={(evt) => closeOnBackDropClick(evt)}>
      <div className='modal__wrapper'>
        <h3 className={`modal__header ${(location.pathname === '/schedule'
          || location.pathname === '/brackets') && 'modal__header_style_gold'}`}>{title}</h3>
        <button type="button" className="modal__close-button"
          onClick={() => modal.current?.close()}> &#215;</button>
        <div className="modal__inner">
          {children}
        </div>
      </div>
    </dialog>
  )
}

export default Modal;
