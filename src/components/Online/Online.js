import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Preloader from "../Preloader/Preloader";
import Sheet from "../Sheet/Sheet";

function Online(props) {

  const [showButton, setShowButton] = React.useState(false);

  if (props.isLoading) {
    return (
      <section className="online">
        <button className='online__button' type="button"></button>
        <div className='online__block'>
          <h2 className="online__header">Гильдия Онлайн</h2>
          <div className="online__background-preloader">
            <Preloader isLoading={props.isLoading} />
          </div>
        </div>
      </section>
    )
  } if (props.isEmptyResult) {
    return (
      <CSSTransition
        in={props.isEmptyResult || showButton === true}
        classNames='transform'
        onEnter={() => setShowButton(true)}
        onExited={() => setShowButton(false)}
        timeout={4000}
        appear={true}
      >
        <section className="online online_disabled">
        <button className='online__button' type="button">
          <div className='online__button-image'></div>
        </button>
          <div className='online__block'>
            <h2 className="online__header">Гильдия Онлайн</h2>
            <div className="online__background-preloader">
              <p className="online-empty">Сервер не отвечает</p>
            </div>
          </div>
        </section>
      </CSSTransition>
    )
  } else {
    console.log(props.players)

    return (
      <section className='online'>
        <button className='online__button' type="button"></button>
        <div className='online__block'>
          <h2 className="online__header">Гильдия Онлайн</h2>
          <div className="online__table">
            <span className="online__table-cell-header">Звание</span>
            <span className="online__table-cell-header">Имя</span>
            <span className="online__table-cell-header">Класс</span>
            <span className="online__table-cell-header">Ilvl</span>
            <span className="online__table-cell-header">Уровень</span>
            {props.players.map((player) =>
              <Sheet player={player} key={player.guid}
              />
            )}
          </div>
        </div>

      </section>
    )
  }
}

export default Online;
