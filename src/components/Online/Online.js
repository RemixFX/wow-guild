import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Preloader from "../Preloader/Preloader";
import Sheet from "../Sheet/Sheet";

function Online(props) {


  if (props.isLoading) {
    return (
      <section className="online">
        <button className='online__button' type="button">
          <div className='online__button-image'></div>
        </button>
        <div className='online__block'>
          <h2 className="online__header">Гильдия Онлайн</h2>
          <div className="online__background-preloader">
            <Preloader isLoading={props.isLoading} />
          </div>
        </div>
      </section>
    )
  } else {
    return (
      <CSSTransition
        in={props.isShowOnline}
        classNames='transform'
        //onEnter={() => setShowButton(false)}
        //onExited={() => setShowButton(true)}
        timeout={2000}
        //appear={true}
      >
        <section className="online">
          <button className='online__button' type="button" onClick={() => props.handleClick()}>
            <div className='online__button-image'></div>
          </button>
          <div className='online__block'>
            <h2 className="online__header">Гильдия Онлайн</h2>
            {props.isEmptyResult || props.isShowOnline ?
              <div className="online__background-preloader">
                <p className="online-empty">{`${props.isEmptyResult ? 'Сервер не отвечает'
                  : 'Список игроков'}`}</p>
              </div>
              :
              <div className="online__table">
                <span className="online__table-cell-header">Звание</span>
                <span className="online__table-cell-header">Имя</span>
                <span className="online__table-cell-header">Класс</span>
                <span className="online__table-cell-header">Ilvl</span>
                <span className="online__table-cell-header">Lvl</span>
                {props.players.map((player) =>
                  <Sheet player={player} key={player.guid}
                  />
                )}
              </div>
            }
          </div>
        </section>
      </CSSTransition>
    )
  }
}

export default Online;
