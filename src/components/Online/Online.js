import Sheet from "../Sheet/Sheet";

function Online(props) {




  return(
    <section className="online">
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
    </section>
  )
}

export default Online;
