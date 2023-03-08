import { FC, MouseEvent, RefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IAccount } from "../../models/aсcountModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { adminSlice } from "../../store/reducers/adminSlice";
import Form from "../Form/Form";

const Modal: FC<{ login: (values: IAccount) => void, register: (values: IAccount) => void }> = ({ login, register }) => {

  const modal: RefObject<HTMLDialogElement> = useRef(null)
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { openLoginForm, openRegisterForm, error, loading } = useAppSelector(state => state.admin)

  useEffect(() => {
    openLoginForm || openRegisterForm ? modal.current?.showModal() : modal.current?.close();
  }, [openLoginForm, openRegisterForm])

  const closeOnBackDropClick = (evt: MouseEvent<HTMLElement>) => {
    if (evt.target === modal.current) {
      modal.current?.close();
    }
  }

  const closeForm = () => {
    modal.current?.close();
  }

  modal.current?.addEventListener('close', () => {
    dispatch(adminSlice.actions.isCloseForm())
  })

  return (
    <dialog className={`modal ${(location.pathname === '/schedule'
      || location.pathname === '/brackets') && 'modal_style_gold'}`}
      ref={modal} onClick={(evt) => closeOnBackDropClick(evt)}>
      {openLoginForm &&
        <Form error={error} loading={loading} submit={login}
          title="Войти в аккаунт" titleButton="Войти" handleCloseForm={closeForm}>
          <p style={{ marginTop: "0", fontSize: "0.8rem", fontStyle: "italic" }}>
            Войти в аккаунт могут только учётные записи администратора.
            Что бы создать такой аккаунт, нужно зайти с учётной записи администратора.
          </p>
        </Form>}
      {openRegisterForm &&
        <Form error={error} loading={loading} submit={register} handleCloseForm={closeForm}
          title="Создать новый аккаунт для офицеров" titleButton="Создать" >
          <p style={{ marginTop: "0", fontSize: "0.8rem", fontStyle: "italic" }}>
            Созданный аккаунт будет обладать всеми правами администратора.
          </p>
        </Form>}
    </dialog>
  )
}

export default Modal;
