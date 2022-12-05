import { MouseEvent, DragEvent, useEffect, useState } from "react";
import { IGroup } from "../../models/bracketsModel";
import { IPlayer } from "../../models/playerModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { playerSlice } from "../../store/reducers/playerSlice";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { bracket10, classColor, raid10 } from "../../utils/config"
import Topbar from "../Topbar/Topbar"


const Constructor = () => {

  const {
    players,
    markSortbyClass,
    markSortbyIlvl,
    markSortbyName,
    markSortbyRace
  } = useAppSelector(state => state.player)
  const [checked, setChecked] = useState(true);
  const dispatch = useAppDispatch();

  const [currentGroup, setCurrentGroup] = useState({})
  const [currentPlayers, setCurrentPlayers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(NaN)
  const [characters, updateCharacters] = useState(bracket10)

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  // Запрос списка игроков если они ещё не были получены
  useEffect(() => {
    players.length === 0 && dispatch(fetchPlayers())
  }, [])

  function handleChangeCheckbox() {
    setChecked(!checked)
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
    if (e.currentTarget.childNodes[0].textContent === 'Раса') {
      dispatch(playerSlice.actions.playersSortbyRace())
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Ilvl') {
      dispatch(playerSlice.actions.playersSortbyIlvl())
      return
    }
  }

  const dragStartHandler = (e: DragEvent<HTMLUListElement>, bplayer?: IGroup, player?: IPlayer): void => {
    player && setCurrentPlayers(player)
    bplayer && setCurrentGroup(bplayer)
  }

  const dragLeaveHandler = (e: DragEvent<HTMLUListElement>): void => {
    e.currentTarget.style.boxShadow = 'none'
  }

  const dragEndHandler = (e: DragEvent<HTMLUListElement>): void => {
    e.currentTarget.style.boxShadow = 'none'
  }

  const dragOverHandler = (e: DragEvent<HTMLUListElement>, g?: any, bplayer?: IGroup): void => {
    e.preventDefault()
    e.currentTarget.style.boxShadow = '0 2px 3px white'
    g && setCurrentIndex(g.group.indexOf(bplayer))

  }
/*
  const dropHandler = (e: DragEvent<HTMLUListElement>, bplayer?: IGroup, player?: IPlayer): void => {
    e.preventDefault()
    bracket10.map((g) => {
      console.log({ ...g.group[0], name: player!.name, class_name: player!.class_name, race: player!.race_name, ilvl: player!.equipment_lvl.avgItemLevel })
      g.group.splice(currentIndex, 1, { ...g.group[0], name: player!.name, class_name: player!.class_name, race: player!.race_name, ilvl: player!.equipment_lvl.avgItemLevel })
    }) */

  //}
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
        <DragDropContext
          /* onDragStart={} */
          //onDragUpdate={() => console.log('яяяяяяяя')}
          onDragEnd={handleOnDragEnd}
        >
          <div className="constructor__brackets">
            <div className="constructor__brackets-header">
              <span className="constructor__brackets-title">Роль</span>
              <span className="constructor__brackets-title">Имя</span>
              <span className="constructor__brackets-title">Класс</span>
              <span className="constructor__brackets-title">Раса</span>
              <span className="constructor__brackets-title">Ilvl</span>
            </div>
              <Droppable droppableId="characters">
                {(provided) => (
                  <div className="brackets-group" {...provided.droppableProps} ref={provided.innerRef}>
                    <h2 className="brackets-group__header">I группа</h2>
                    <h2 className="brackets-group__header brackets-group__header_type_next">II группа</h2>
                    {characters.map((bplayer, index) =>
                      <Draggable key={bplayer.name} draggableId={bplayer.name} index={index}>
                        {(provided) => (
                          <ul className="brackets-group__rows" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <li className="brackets-group__cell brackets-group__cell_type_select" >
                              <select className="select-role">
                                <option value="Танк">Танк</option>
                                <option value="Лекарь">Лекарь</option>
                                <option value="РДД">РДД</option>
                                <option value="МДД">МДД</option>
                              </select>
                            </li>
                            <li className="brackets-group__cell" >{bplayer.name}</li>
                            <li className="brackets-group__cell" style={classColor(bplayer)}>{bplayer.class_name}</li>
                            <li className="brackets-group__cell">{bplayer.race}</li>
                            <li className="brackets-group__cell">{bplayer.ilvl}</li>
                          </ul>
                        )}
                      </Draggable>
                    )}
                    {provided.placeholder}

                  </div>
                )}
              </Droppable>


          </div>
          <div className="constructor__table">
            <div className="constructor__table-drag-button" style={{ gridRowEnd: `${players.length + 2}` }}></div>
            <div className="constructor__table-row-header">
              <div className="constructor__table-column-header" onClick={e => sortHandler(e)}>
                <span className="constructor__table-column-title">Имя</span>
                {markSortbyName && <span className="constructor__table-column-marker"></span>}
              </div>
              <div className="constructor__table-column-header" onClick={e => sortHandler(e)}>
                <span className="constructor__table-column-title">Класс</span>
                {markSortbyClass && <span className="constructor__table-column-marker"></span>}
              </div>
              <div className="constructor__table-column-header" onClick={e => sortHandler(e)}>
                <span className="constructor__table-column-title">Раса</span>
                {markSortbyRace && <span className="constructor__table-column-marker"></span>}
              </div>
              <div className="constructor__table-column-header" onClick={e => sortHandler(e)}>
                <span className="constructor__table-column-title">Ilvl</span>
                {markSortbyIlvl && <span className="constructor__table-column-marker"></span>}
              </div>
            </div>

            {players.map((player, index) =>
              <ul className="table__row item" key={player.guid}>
                <button type="button" className="table__add-button"></button>
                <li className="table__cell" >{player.name}</li>
                <li className="table__cell" style={classColor(player)}>{player.class_name}</li>
                <li className="table__cell">{player.race_name}</li>
                <li className="table__cell">{player.equipment_lvl.avgItemLevel}</li>
              </ul>
            )}
          </div>
        </DragDropContext>
      </div>
      <footer className="constructor__footer">
        <button type="button" className="button selection-10">Отправить</button>
        <button type="button" className="button selection-25">Сохранить</button>
      </footer>
    </section>
  )
}

export default Constructor




