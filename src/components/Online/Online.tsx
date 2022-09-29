import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { OnlineComponentSlice } from '../../store/reducers/onlineComponentSlice';
import Preloader from "../Preloader/Preloader";
import Sheet from "../Sheet/Sheet";

const Online = () => {

  const dispatch = useAppDispatch();
  const { players, loading, error, onlinePlayers, textOnline, noOnline } = useAppSelector(state => state.player)
  const { isShowOnline, waitingForAnimation } = useAppSelector(state => state.online)
  const [showAllPlayers, setShowAllPlayers] = useState(false)

  // Первичный запрос игроков с сервера для модуля "Онлайн"
  useEffect(() => {
    dispatch(fetchPlayers())
  }, [])

  // Кнопка открытия/закрытия модуля "Онлайн"
  const showOnlinePlayers = () => {
    if (isShowOnline) {
      dispatch(OnlineComponentSlice.actions.hideOnline())
      setShowAllPlayers(false)
    } else {
      dispatch(OnlineComponentSlice.actions.showOnline())
      //setTimeout(() => dispatch(OnlineComponentSlice.actions.showTimedOnline()), 2010)
    }
  }

  // Принудительный запрос игроков при открытия модуля "Онлайн",
  // если изначально их нет или была ошибка сервера
  const handleAnimationEnd = () => {
    console.log('тута')
    if (isShowOnline && (error || noOnline)) {
      dispatch(fetchPlayers())
    } else {
      dispatch(OnlineComponentSlice.actions.showTimedOnline())
    }
  }

  // Кнопка переключения отображать всех/только онлайн икроков
  const showHiddenPlayers = () => {
    setShowAllPlayers(!showAllPlayers)
  }

  return (
    <CSSTransition
      onExited={handleAnimationEnd}
      onEntered={() => console.log('зашло')}
      in={!isShowOnline}
      classNames='transform'
      timeout={2000}
    //onAnimationEnd={handleAnimationEnd}
    >
      <section className="online">
        <button className='online__button' type="button" onClick={showOnlinePlayers}>
          <div className='online__button-image'></div>
        </button>
        <div className='online__block'>
          <div className='online__header-block'>
            <h2 className="online__header">Гильдия Онлайн</h2>
            {(waitingForAnimation && !error) && (<button className={`online__switch-button
             ${showAllPlayers && 'online__switch-button_toggle-on'}`}
              type='button' onClick={showHiddenPlayers}>
              {`${!showAllPlayers ? 'показать всех' : 'скрыть не в сети'}`}
            </button>)}
          </div>
          {((noOnline && !showAllPlayers) || error || loading || !waitingForAnimation) &&
            (<div className="online__background-preloader">
              {loading && <Preloader isLoading={loading} />}
              <p className="online-empty">{textOnline}</p>
            </div>)}
          {((waitingForAnimation && !error && !loading && !noOnline) || (waitingForAnimation && noOnline && showAllPlayers)) &&
            (<div className="online__table">
              <span className="online__table-cell-header">Звание</span>
              <span className="online__table-cell-header">Имя</span>
              <span className="online__table-cell-header">Класс</span>
              <span className="online__table-cell-header">Ilvl</span>
              <span className="online__table-cell-header">Lvl</span>
              {showAllPlayers || (showAllPlayers && noOnline) ?
                players.map((player) =>
                  (<Sheet player={player} key={player.guid} />))
                :
                onlinePlayers.map((player) =>
                  (<Sheet player={player} key={player.guid} />))
              }
            </div>)
          }
        </div>
      </section>
    </CSSTransition>
  )
}

export default Online;
