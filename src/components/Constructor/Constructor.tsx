import { MouseEvent, DragEvent, useEffect, useState, Ref, ChangeEvent } from "react";
import { IGroup } from "../../models/bracketsModel";
import { IPlayer } from "../../models/playerModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { playerSlice } from "../../store/reducers/playerSlice";
import { DragDropContext, Draggable, DraggableStateSnapshot, Droppable, DropResult } from 'react-beautiful-dnd';
import { classColor, raid10 } from "../../utils/config"
import Topbar from "../Topbar/Topbar"


const Constructor = () => {

  const {
    players,
    markSortbyClass,
    markSortbyIlvl,
    markSortbyName,
    markSortbyRace
  } = useAppSelector(state => state.player)
  const [checked, setChecked] = useState(true)
  const dispatch = useAppDispatch()
  const [columnSource, setColumnSource] = useState<string>('')
  const [isNotUniqueName, setIsNotUniqueName] = useState<boolean>(false)
  const [bracketPlayers, setBracketPlayers] = useState(raid10)

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

  // Добавление игрока в брекет с помощью копки
  const handleAddPlayer = (player: IPlayer) => {
    const parsedPlayer = {
      id: String(player.guid),
      name: player.name,
      class_name: player.class_name,
      race: player.race_name,
      ilvl: player.equipment_lvl.avgItemLevel
    }

  }

  // Проврека на уникальность ника при перетаскивании
  const handleOnDragStart = (result: DropResult) => {
    setColumnSource(result.source.droppableId)
    if (result.source.droppableId !== 'players') return
    const inn = Object.keys(bracketPlayers)
    let items: IGroup[] = [];
    for (let i = 0; i < inn.length; i++) {
      items.push(...bracketPlayers[inn[i]].players)
    }
    const sourceIndex = players[result.source.index]
    const isUniqueNames = items.map((i) => i.name).some((n) => n === sourceIndex.name)
    isUniqueNames ? setIsNotUniqueName(true) : setIsNotUniqueName(false)
  }

  // Обработка действий, когда игрок попадает в список перетаскиванием
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (isNotUniqueName) return
    const { source, destination } = result
    const destList= bracketPlayers[destination.droppableId]; //куда тащим, (айди,массив)
    const destItems = [...destList.players]; // новый массив куда тащим

    if (source.droppableId === 'players') {
      const sourceIndex = players[result.source.index]
      const parsedPlayer = {
        id: String(sourceIndex.guid),
        role: destList.players[destination.index].role,
        name: sourceIndex.name,
        class_name: sourceIndex.class_name,
        race: sourceIndex.race_name,
        ilvl: sourceIndex.equipment_lvl.avgItemLevel
      }
      destItems.splice(destination.index, 1, parsedPlayer); // вставляем этот элемент в новый массив на позицию дест с удалением
      setBracketPlayers({
        ...bracketPlayers,
        [destination.droppableId]: {
          ...destList,
          players: destItems
        }
      })
      setIsNotUniqueName(false)
      setColumnSource('')
    }
    else if (source.droppableId !== destination.droppableId) {
      const sourceList = bracketPlayers[source.droppableId]; //откуда тащим (айди, массив)
      const sourceItems = [...sourceList.players]; // новый масив откуда тащим
      const [removed] = sourceItems.splice(source.index, 1); //удаляем элемент из массива откуда тащим и получаем этот жлемент
      destItems.splice(destination.index, 0, removed); // вставляем этот элемент в новый массив на позицию дест
      setBracketPlayers({
        ...bracketPlayers,
        [source.droppableId]: {
          ...sourceList,
          players: sourceItems
        },
        [destination.droppableId]: {
          ...destList,
          players: destItems
        }
      })
      setIsNotUniqueName(false)
      setColumnSource('')
    } else {
      (console.log('ласт блок'))
      const column = bracketPlayers[source.droppableId];
      const copiedItems = [...column.players];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setBracketPlayers({
        ...bracketPlayers,
        [source.droppableId]: {
          ...column,
          players: copiedItems
        }
      });
      setIsNotUniqueName(false)
      setColumnSource('')
    }
  }

  // Изменение стиля курсора, если перетаскиваемый игрок уже есть в списке брекета
  const getCursorStyle = (style: any, snapshot: DraggableStateSnapshot) => {
    if (isNotUniqueName && snapshot.isDragging) {
      return {
        cursor: 'no-drop',
        ...style,
        ...{ pointerEvents: 'auto' }
      }
    } else return style
  }

  // Изменение стандартного стиля при перетаскивании из списка игроков в брекет
  function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDraggingOver || columnSource !== 'players') return style
    else {
      return {
        ...style,
        transform: `translateY(0)`,
        boxShadow: !isNotUniqueName && `0px 0px 4px 2px #a0c6f9`
      };
    }
  }

  // Переключение роли
  const handleSelectRole = (e: ChangeEvent<HTMLSelectElement>, group: string, player: IGroup) => {
    const newArr = bracketPlayers[group].players.map((p) => {
      if (p.id === player.id) {
        return { ...p, role: e.target.value }
      }
      return p
    })

    setBracketPlayers(
      { ...bracketPlayers, [group]: { ...bracketPlayers[group], players: newArr } }
    )
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
        <DragDropContext
          onDragStart={handleOnDragStart}
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
            {Object.entries(bracketPlayers).map(([groupId, group]) =>
              <div className="brackets-group" key={groupId}>
                <h2 className="brackets-group__header">{group.title}</h2>
                <Droppable droppableId={groupId}>
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {group.players.map((bplayer, index) =>
                        <Draggable key={bplayer.id} draggableId={bplayer.id} index={index}>
                          {(provided) => (
                            <ul className="brackets-group__rows"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getStyle(provided.draggableProps.style, snapshot)}
                            >
                              <li className="brackets-group__cell brackets-group__cell_type_select" >
                                <select className="select-role" value={bplayer.role}
                                  onChange={(e) => handleSelectRole(e, groupId, bplayer)}>
                                  <option value="Танк">Танк</option>
                                  <option value="Лекарь">Лекарь</option>
                                  <option value="РДД">РДД</option>
                                  <option value="МДД">МДД</option>
                                </select>
                              </li>
                              <li className="brackets-group__cell" >{bplayer.name}</li>
                              <li className="brackets-group__cell" style={classColor(bplayer)}>
                                {bplayer.class_name}
                              </li>
                              <li className="brackets-group__cell">{bplayer.race}</li>
                              <li className="brackets-group__cell">{bplayer.ilvl ? bplayer.ilvl : ""}</li>
                            </ul>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}

          </div>
          <Droppable droppableId="players" isDropDisabled={true}>
            {(provided) => (

              <div className="constructor__table" {...provided.droppableProps} ref={provided.innerRef}>
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
                  <Draggable key={player.name} draggableId={player.name} index={index}>
                    {(provided, snapshot) => (
                      <ul className="table__row item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getCursorStyle(provided.draggableProps.style, snapshot)}
                      >
                        <button type="button" className="table__add-button"
                        onClick={() => handleAddPlayer(player)}></button>
                        <li className="table__cell" >{player.name}</li>
                        <li className="table__cell" style={classColor(player)}>{player.class_name}</li>
                        <li className="table__cell">{player.race_name}</li>
                        <li className="table__cell">{player.equipment_lvl.avgItemLevel}</li>
                      </ul>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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




