import { Link, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLogout } from "../../store/reducers/ActionCreators";
import { adminSlice } from "../../store/reducers/adminSlice";

const Topbar = () => {

  const location = useLocation();
  const { loggedIn, currentUser } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch();

  //Вход или Выход из аккаунта
  const handleButtonClick = () => {
    if (loggedIn) {
      dispatch(fetchLogout())
    } else
      dispatch(adminSlice.actions.isOpenLoginForm())
  }

  const changeStyle = () => {
    switch (location.pathname) {
      case '/schedule':
        return true
      case '/constructor':
        return true
      case '/brackets':
        return true
      default:
        return false
    }
  }


  return (
    <div className="topbar">
      <Link className="schedule__navigation-link" to="/" style={changeStyle() ?
        { visibility: 'visible' } : {}}>&#8635; На главную страницу</Link>
      <div className="topbar__authorization">
        <p className="topbar__authorization-name">{currentUser}</p>
        <button className={`topbar__authorization-button ${(location.pathname === '/schedule'
          || location.pathname === '/brackets')
          && 'topbar__authorization-button_style_gold'}`} type="button"
          onClick={handleButtonClick}
        >{loggedIn ? 'Выйти' : 'Войти'}</button>
        {loggedIn &&
          <button className={`topbar__authorization-button ${location.pathname === '/schedule'
            && 'topbar__authorization-button_type_schedule'}`} type="button"
            onClick={() => dispatch(adminSlice.actions.isOpenRegisterForm())}>Создать аккаунт</button>
        }
      </div>
    </div>
  )
}

export default Topbar
