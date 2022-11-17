import { Link, useLocation } from "react-router-dom"
import { useAppSelector } from "../../store/hooks";

const Topbar = () => {

  const location = useLocation();
  const { loggedIn } = useAppSelector(state => state.admin)

  return(
    <div className="topbar">

    <Link className="schedule__navigation-link" to="/" style={location.pathname === '/schedule' ?
  {visibility: 'visible'} : {}}>&#8635; На главную страницу</Link>
    <div className="topbar__authorization">
      <p className="topbar__authorization-name">Никнейм</p>
      <button className={`topbar__authorization-button ${location.pathname === '/schedule'
      && 'topbar__authorization-button_type_schedule'}`} type="button">Выйти</button>
      {loggedIn &&
        <button className={`topbar__authorization-button ${location.pathname === '/schedule'
        && 'topbar__authorization-button_type_schedule'}`} type="button">Создать аккаунт</button>
      }
    </div>
  </div>
  )
}

export default Topbar
