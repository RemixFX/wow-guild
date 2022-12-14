import { MouseEvent, useEffect, useState, ChangeEvent } from "react";
import { IGroup } from "../../models/bracketsModel";
import { IPlayer } from "../../models/playerModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { playerSlice } from "../../store/reducers/playerSlice";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { classColor, groupRaceBuffs, raid10, raidBuffs } from "../../utils/config"
import Topbar from "../Topbar/Topbar"


const Constructor = () => {

  const {
    players,
    constructorPlayers,
    markSortbyClass,
    markSortbyIlvl,
    markSortbyName,
    markSortbyRace
  } = useAppSelector(state => state.player)
  const [checked, setChecked] = useState(true)
  const dispatch = useAppDispatch()
  const [columnSource, setColumnSource] = useState<string>('')
  const [bracketPlayers, setBracketPlayers] = useState(raid10)
  const [isactiveGroupButton, setIsActiveGroupButton] = useState('');
  const [isactiveRaidButton, setIsActiveRaidButton] = useState('active');

  // Запрос списка игроков если они ещё не были получены
  useEffect(() => {
    constructorPlayers.length === 0 && dispatch(fetchPlayers())
  }, [])

  // Переключение списков брекета: на 10 или 25 игроков
  function handleChangeCheckbox() {
    setChecked(!checked)
  }

  // Сортировка таблицы игроков
  const sortHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.childNodes[0].textContent === 'Имя') {
      dispatch(playerSlice.actions.playersSortbyName('constructor_players'))
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Класс') {
      dispatch(playerSlice.actions.playersSortbyClass('constructor_players'))
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Раса') {
      dispatch(playerSlice.actions.playersSortbyRace('constructor_players'))
      return
    }
    if (e.currentTarget.childNodes[0].textContent === 'Ilvl') {
      dispatch(playerSlice.actions.playersSortbyIlvl('constructor_players'))
      return
    }
  }

  // Добавление игрока в брекет с помощью кнопки
  const handleAddPlayer = (player: IPlayer) => {
    const inn = Object.keys(bracketPlayers)
    const findFreePlayerIndex = () => {
      for (let i = 0; i < inn.length; i++) {
        const index = bracketPlayers[inn[i]].players.findIndex(p => !p.name)
        if (index >= 0) return { index, group: inn[i] }
      }
    }
    const playerIndex = (findFreePlayerIndex())
    if (!playerIndex) return

    const parsedPlayer = {
      id: String(player.guid),
      role: bracketPlayers[playerIndex.group].players[playerIndex.index].role,
      name: player.name,
      class_name: player.class_name,
      race: player.race_name,
      ilvl: player.equipment_lvl.avgItemLevel
    }
    const newGroup = bracketPlayers[playerIndex.group].players.map((bplayer, index) => {
      if (index === playerIndex.index) {
        return parsedPlayer
      }
      return bplayer
    })
    const newBracketList = constructorPlayers.filter(p => p.guid !== player.guid)
    dispatch(playerSlice.actions.playersChange(newBracketList))
    setBracketPlayers({
      ...bracketPlayers,
      [playerIndex.group]: {
        ...bracketPlayers[playerIndex.group], players: newGroup
      }
    })
  }

  //Удаление игрока из списка брекета
  const handleDeletePlayer = (player: IGroup, groupId: string) => {
    const playerIndex = bracketPlayers[groupId].players.findIndex(p => p.name === player.name)
    const placeHolder =
      { id: String(Math.floor(Math.random() * 10000)), role: 'РДД', name: '', class_name: '', race: '', ilvl: null }
    const newGroup = [...bracketPlayers[groupId].players]
    newGroup.splice(playerIndex, 1, placeHolder)

    const pushPlayer = () => {
      const removedPlayer = players.find((p) => p.name === player.name)
      if (removedPlayer) {
        dispatch(playerSlice.actions.playersChange([...constructorPlayers, removedPlayer]))
        markSortbyClass ? dispatch(playerSlice.actions.playersSortbyClass('constructor_players')) :
          markSortbyIlvl ? dispatch(playerSlice.actions.playersSortbyIlvl('constructor_players')) :
            markSortbyName ? dispatch(playerSlice.actions.playersSortbyName('constructor_players')) :
              markSortbyRace ? dispatch(playerSlice.actions.playersSortbyRace('constructor_players')) :
                dispatch(playerSlice.actions.playersSortbyRank())
      } else return
    }

    setBracketPlayers({
      ...bracketPlayers,
      [groupId]: {
        ...bracketPlayers[groupId], players: newGroup
      }
    })
    pushPlayer()
  }

  // сохранение названия списка, откуда идёт перетаскивание
  const handleOnDragStart = (result: DropResult) => {
    setColumnSource(result.source.droppableId)
  }

  // Обработка действий, когда игрок попадает в список перетаскиванием
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result
    const destList = bracketPlayers[destination.droppableId];
    const destItems = [...destList.players];

    if (source.droppableId === 'players') {
      if (destination.index >= destList.players.length) return
      const sourceIndex = constructorPlayers[source.index]
      const parsedPlayer = {
        id: String(sourceIndex.guid),
        role: destList.players[destination.index].role,
        name: sourceIndex.name,
        class_name: sourceIndex.class_name,
        race: sourceIndex.race_name,
        ilvl: sourceIndex.equipment_lvl.avgItemLevel
      }
      const sourceItems = [...constructorPlayers]
      sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 1, parsedPlayer);
      setBracketPlayers({
        ...bracketPlayers,
        [destination.droppableId]: {
          ...destList,
          players: destItems
        }
      })
      dispatch(playerSlice.actions.playersChange(sourceItems))
      setColumnSource('')
    }
    else if (source.droppableId !== destination.droppableId) {
      const sourceList = bracketPlayers[source.droppableId];
      const sourceItems = [...sourceList.players];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
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
      setColumnSource('')
    } else {
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
      setColumnSource('')
    }
  }

  // Изменение стандартного стиля при перетаскивании из списка игроков в брекет
  function getStyle(style: any, snapshot: any) {
    if (!snapshot.isDraggingOver || columnSource !== 'players') return style
    else {
      return {
        ...style,
        transform: `translateY(0)`,
        boxShadow: `0px 0px 4px 2px #a0c6f9`
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

  const getNameGroupBuff = (playersGroup: IGroup[]) => {
  let namesBuff: string[] = []
  groupRaceBuffs.forEach((item) => {
     return playersGroup.forEach((p) => {
        if (item.sourseBuff === p.race) {
          namesBuff = [...namesBuff, item.buff]
        }
      })
    })
    return namesBuff.join(', ')
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
        <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
          <div className="constructor__brackets">
            <div className="constructor__brackets-delete-button"></div>
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
                              <button type="button" className="brackets__delete-button"
                                onClick={() => handleDeletePlayer(bplayer, groupId)}
                                disabled={bplayer.name === ''}>
                              </button>
                            </ul>
                          )}
                        </Draggable>
                      )}
                      {columnSource !== 'players' && provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </div>
          <Droppable droppableId="players" isDropDisabled={true}>
            {(provided) => (
              <div className="constructor__table" {...provided.droppableProps} ref={provided.innerRef}>
                <div className="constructor__table-drag-button" style={{ gridRowEnd: `${constructorPlayers.length + 2}` }}></div>
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
                {constructorPlayers.map((player, index) =>
                  <Draggable key={player.name} draggableId={player.name} index={index}>
                    {(provided, snapshot) => (
                      <ul className="table__row item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
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
        <div className="constructor__buffs">
          <div className="tab-switch">
            <button type="button" className={`tab-switch__button ${isactiveGroupButton}`}
              onClick={() => {
                setIsActiveRaidButton('')
                setIsActiveGroupButton('active')
              }}
            >Синергия рас</button>
            <button type="button" className={`tab-switch__button ${isactiveRaidButton}`}
              onClick={() => {
                setIsActiveGroupButton('')
                setIsActiveRaidButton('active')
                getNameGroupBuff(bracketPlayers['group1'].players)
              }}
            >Рейдовые баффы</button>
          </div>
          {isactiveGroupButton === 'active' &&
          <div className="flex-container">
            {Object.values(bracketPlayers).map((group) =>
              <div className="group-buffs" key={group.title}>
                <h3 className="group-buffs__number">{group.title}</h3>
                <p className="group-buffs__name">{getNameGroupBuff(group.players)}</p>
              </div>
            )}
            </div>
          }
          {isactiveRaidButton === 'active' &&
            <ul className="raid-buffs">*в разработке
              {raidBuffs.map((data) =>
                <li className="raid-buffs__name" key={data.buff}>{data.buff}</li>
              )}
            </ul>
          }
        </div>
      </div>
      <footer className="constructor__footer">
        <button type="button" className="button selection-10">Отправить</button>
        <button type="button" className="button selection-25">Сохранить</button>
      </footer>
    </section>
  )
}

export default Constructor
