import { MouseEvent, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { OnlineComponentSlice } from '../../store/reducers/onlineComponentSlice';
import { playerSlice } from '../../store/reducers/playerSlice';
import PreloaderOnline from '../PreloaderOnline/PreloaderOnline';
import Sheet from "../Sheet/Sheet";

const Online = () => {

  const dispatch = useAppDispatch();
  const { players,
    loading,
    error,
    onlinePlayers,
    textOnline,
    noOnline,
    markSortbyClass,
    markSortbyIlvl,
    markSortbyName,
    markSortbyRank } = useAppSelector(state => state.player)
  const { isShowOnline } = useAppSelector(state => state.online)
  const [showAllPlayers, setShowAllPlayers] = useState(false)
  const [isEndAnimation, setEndAnimation] = useState(true)

  // Первичный запрос игроков с сервера для модуля "Онлайн"
  useEffect(() => {
    dispatch(fetchPlayers())
  }, [])

  // Кнопка открытия/закрытия модуля "Онлайн"
  const showOnlinePlayers = () => {
    if (isShowOnline) {
      dispatch(OnlineComponentSlice.actions.hideOnline())
      setShowAllPlayers(false)
      setEndAnimation(false)
    } else {
      dispatch(OnlineComponentSlice.actions.showOnline())
    }
  }

  // Принудительный запрос игроков при открытия модуля "Онлайн",
  // если изначально их нет или была ошибка сервера
  const handleAnimationEnd = () => {
    setEndAnimation(true)
    if (error || noOnline) {
      dispatch(fetchPlayers())
    }
  }

  // Кнопка переключения отображать всех/только онлайн икроков
  const showHiddenPlayers = () => {
    setShowAllPlayers(!showAllPlayers)
  }

  // Сортировка таблицы игроков
  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.childNodes[0].textContent === 'Имя') {
      dispatch(playerSlice.actions.playersSortbyName())
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Класс') {
      dispatch(playerSlice.actions.playersSortbyClass())
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Звание') {
      dispatch(playerSlice.actions.playersSortbyRank())
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Ilvl') {
      dispatch(playerSlice.actions.playersSortbyIlvl())
      return
    }
  }

  return (
    <CSSTransition
      onExited={handleAnimationEnd}
      in={!isShowOnline}
      classNames='transform'
      timeout={2000}
    >
      <section className="online">
        <button className='online__button' type="button" onClick={showOnlinePlayers}>
          <div className='online__button-image'></div>
        </button>
        <div className='online__block'>
          <div className='online__header-block'>
            <h2 className="online__header">Гильдия Онлайн</h2>
            {(isEndAnimation && !error) && (<button className={`online__switch-button
             ${showAllPlayers && 'online__switch-button_toggle-on'}`}
              type='button' onClick={showHiddenPlayers}>
              {`${!showAllPlayers ? 'показать всех' : 'скрыть не в сети'}`}
            </button>)}
          </div>
          {((noOnline && !showAllPlayers) || error || loading || !isShowOnline) &&
            (<div className="online__background-preloader">
              {loading && <PreloaderOnline isLoading={loading} />}
              <p className="online-empty">{textOnline}</p>
            </div>)}
          {((isEndAnimation && !error && !loading && !noOnline) || (noOnline && showAllPlayers)) &&
            (<div className="online__table">
              <div className='online__table-header' onClick={e => sortHandler(e)}>
                <span className="online__table-header-title">Звание</span>
                {markSortbyRank && <span className="online__table-column-marker"></span>}
              </div>
              <div className='online__table-header' onClick={e => sortHandler(e)}>
                <span className="online__table-title">Имя</span>
                {markSortbyName && <span className="online__table-column-marker"></span>}
              </div>
              <div className='online__table-header' onClick={e => sortHandler(e)}>
                <span className="online__table-title">Класс</span>
                {markSortbyClass && <span className="online__table-column-marker"></span>}
              </div>
              <div className='online__table-header' onClick={e => sortHandler(e)}>
                <span className="online__table-title">Ilvl</span>
                {markSortbyIlvl && <span className="online__table-column-marker"></span>}
              </div>
              <div className='online__table-header' style={{cursor: 'default'}}>
                <span className="online__table-title">Lvl</span>
              </div>
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
