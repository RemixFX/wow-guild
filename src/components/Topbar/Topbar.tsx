import { FC, RefObject, useRef } from "react";
import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../../store/hooks";



interface IProps {
  handleOpenModalWithSignin: () => void
}

const Topbar:FC<IProps> = ({handleOpenModalWithSignin}) => {

  const location = useLocation();
  const { loggedIn } = useAppSelector(state => state.admin)
  const qqq: RefObject<HTMLDialogElement> = useRef(null)



  return(
    <div className="topbar">
    <Link className="schedule__navigation-link" to="/" style={location.pathname === '/schedule' ?
  {visibility: 'visible'} : {}}>&#8635; На главную страницу</Link>
    <div className="topbar__authorization">
      <p className="topbar__authorization-name">Никнейм</p>
      <button className={`topbar__authorization-button ${location.pathname === '/schedule'
      && 'topbar__authorization-button_type_schedule'}`} type="button"
      onClick={handleOpenModalWithSignin}
      >Выйти</button>
      {loggedIn &&
        <button className={`topbar__authorization-button ${location.pathname === '/schedule'
        && 'topbar__authorization-button_type_schedule'}`} type="button"
        onClick={() => qqq.current?.showModal()}>Создать аккаунт</button>
      }
    </div>
    <dialog ref={qqq} id="myDialog" onClick={() => qqq.current?.close()}>TESTTETSHKJ</dialog>
  </div>
  )
}

export default Topbar
