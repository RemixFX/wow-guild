import { useEffect, useState } from "react";
import { IPlayer } from "../../models/playerModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { playerSlice } from "../../store/reducers/playerSlice";
import { bracket10, classColor } from "../../utils/config"
import Topbar from "../Topbar/Topbar"


const Constructor = () => {

  const { players } = useAppSelector(state => state.player)
  const [checked, setChecked] = useState(true);
  const dispatch = useAppDispatch();

  // Запрос списка игроков если они ещё не были получены
  useEffect(() =>  {
    players.length === 0 && dispatch(fetchPlayers())
  }, [])

  function handleChangeCheckbox() {
    setChecked(!checked)
  }


  const sortHandler = () => {
    dispatch(playerSlice.actions.playersSortbyClass())
  }

  return (

    <section className="constructor">
      <Topbar />
      <h1 className="constructor__header">Создать состав</h1>
      <div className="button-selection">
      <label className="constructor__switch">
          <input type="checkbox" className="constructor__checkbox"
            checked={checked} onChange={handleChangeCheckbox} />
          <span className="constructor__slider_name_left"> Для 10ки</span>
          <span className="constructor__slider"></span>
          <span className="constructor__slider_name_right">Для 25ки</span>
        </label>
      </div>
      <div className="constructor__layout">
        <div className="brackets-block">
          <div className="constructor__brackets-row-header">
            <span className="constructor__table-column-header">Роль</span>
            <span className="constructor__table-column-header">Имя</span>
            <span className="constructor__table-column-header">Класс</span>
            <span className="constructor__table-column-header">Раса</span>
            <span className="constructor__table-column-header">Ilvl</span>
          </div>

          {bracket10.map((player) =>
            <ul className="brackets__row" key={player.name} draggable={true}>
              <li className="brackets__cell" >{player.role}</li>
              <li className="brackets__cell" >{player.name}</li>
              <li className="brackets__cell" style={classColor(player)}>{player.class_name}</li>
              <li className="brackets__cell">{player.race}</li>
              <li className="brackets__cell">{player.ilvl}</li>
            </ul>
          )}
        </div>
        <div className="constructor__table">
          <div className="constructor__table-drag-button" style={{ gridRowEnd: `${players.length + 2}` }}></div>
          <div className="constructor__table-row-header">
            <div className="constructor__table-column-header">
              <span className="constructor__table-column-tittle">Имя</span>
            </div>
            <div className="constructor__table-column-header">
              <span className="constructor__table-column-header">Класс</span>
            </div>
            <div className="constructor__table-column-header">
              <span className="constructor__table-column-header">Раса</span>
            </div>
            <div className="constructor__table-column-header">
              <span className="constructor__table-column-header">Ilvl</span>
            </div>
          </div>
          {players.map((player) =>
            <ul className="table__row" key={player.guid} draggable={true}>
              <button type="button" className="table__add-button"></button>
              <li className="table__cell" >{player.name}</li>
              <li className="table__cell" style={classColor(player)}>{player.class_name}</li>
              <li className="table__cell">{player.race_name}</li>
              <li className="table__cell">{player.equipment_lvl.avgItemLevel}</li>
            </ul>
          )}
        </div>
      </div>
      <footer className="constructor__footer">
        <button type="button" className="button selection-10" onClick={sortHandler}>Отправить</button>
        <button type="button" className="button selection-25">Сохранить</button>
      </footer>
    </section>
  )
}

export default Constructor


