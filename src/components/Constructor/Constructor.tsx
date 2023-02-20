/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useEffect, useState, ChangeEvent, useDeferredValue, FormEvent } from "react";
import { IGroup, IGroupDB } from "../../models/bracketsModel";
import { IPlayer } from "../../models/playerModel";
import { useAppDispatch, useAppSelector, useDebounce, useSearchPlayer } from "../../store/hooks"
import { fetchGuild, fetchPlayers, postNewsGuild } from "../../store/reducers/ActionCreators";
import { playerSlice } from "../../store/reducers/playerSlice";
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { classColor, getNameGroupBuff, GUILD_ID, GUILD_REALM_ID, raid10, raid25, raidBuffs } from "../../utils/config"
import Topbar from "../Topbar/Topbar"
import { searchSlice } from "../../store/reducers/searchSlice";
import { ISearchGuild } from "../../models/searchGuild";
import ModalBrackets from "../ModalBrackets/ModalBrackets";
import InfoSlider from "../InfoSlider/infoSlider";
import { dbApi } from "../../utils/Api";
import Preloader from "../Preloader/Preloader";
const flag = require('../../images/flag.png')

const Constructor = () => {

  const {
    players,
    constructorPlayers,
    nameGuild,
    markSortbyClass,
    markSortbyIlvl,
    markSortbyName,
    markSortbyRace
  } = useAppSelector(state => state.player)
  const { searchValue, searchLoading, searchError, searchMessage } = useAppSelector(state => state.search)
  const { currentUser, loggedIn } = useAppSelector(state => state.admin)
  const [checkedBracket, setCheckedBracket] = useState(false)
  const [checkedSearch, setCheckedSearch] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [realmId, setRealmId] = useState<string>('57')
  const [columnSource, setColumnSource] = useState<string>('')
  const [isLoading, setisLoading] = useState(false)
  const [isShowPostMessage, setIsShowPostMessage] = useState(false)
  const [isactiveGroupButton, setIsActiveGroupButton] = useState('active')
  const [isactiveRaidButton, setIsActiveRaidButton] = useState('')
  const [inputSearchGuildValue, setInputSearchGuildValue] = useState('')
  const [inputSearchPlayerValue, setInputSearchPlayerValue] = useState('')
  const [bracketPlayers, setBracketPlayers] = useState(raid10)
  const [bracketPreviewModal, setBracketPreviewModal] = useState(false)
  const deferredSearchGuildValue = useDeferredValue(inputSearchGuildValue)
  const deferredSearchPlayerValue = useDeferredValue(inputSearchPlayerValue)
  const debouncedValue = useDebounce<string>(deferredSearchGuildValue, 1000)
  const foundPlayerValue = useSearchPlayer(constructorPlayers, deferredSearchPlayerValue)
  const currentPlayers: IPlayer[] = deferredSearchPlayerValue === "" ?
    constructorPlayers : foundPlayerValue;
  const dispatch = useAppDispatch()

  // Запрос списка игроков если они ещё не были получены
  useEffect(() => {
    constructorPlayers.length === 0 && dispatch(fetchPlayers(GUILD_ID, GUILD_REALM_ID))
  }, [])

  // Переключатель списков брекета
  const handleChangeBracketCheckbox = () => {
    setCheckedBracket(!checkedBracket)
  }

  // Функция переключения и обнуления списков брекета: на 10 или 25 игроков
  const changeBracketGroups = () => {
    dispatch(playerSlice.actions.playersFetchingSuccess(players))
    checkedBracket ? setBracketPlayers(raid25) : setBracketPlayers(raid10)
  }

  // Отслеживание переключения списков брекета
  useEffect(() => {
    changeBracketGroups()
  }, [checkedBracket])

  // Переключение поиска гильдии или игрока в списке
  const handleChangeSearchCheckbox = () => {
    setCheckedSearch(!checkedSearch)
    setInputSearchPlayerValue('')
    setInputSearchGuildValue('')
    setShowModal(false)
  }

  // Выбор игрового мира при поиске гильдии
  const handleSelectTypeSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    setRealmId(e.target.value)
    setInputSearchGuildValue('')
  }

  //Очистка списка кнопкой "Сбросить"
  const handleClickResetButton = () => {
    changeBracketGroups()
    dispatch(playerSlice.actions.playersFetchingSuccess(players))
  }

  // Изменение значения инпута
  const handleChangeInputValue = (value: string) => {
    if (checkedSearch) {
      setInputSearchGuildValue(value)
      setInputSearchPlayerValue('')
    } else {
      setInputSearchPlayerValue(value)
      setInputSearchGuildValue('')
    }
  }

  // Использование отложенного запроса результатов поиска
  useEffect(() => {
    if (debouncedValue) {
      dispatch(fetchGuild(debouncedValue, realmId))
    } else {
      dispatch(searchSlice.actions.guildFetchingSuccess([]));
    }
  }, [debouncedValue])

  // Очистка инпута при нажатии на область
  const handleCloseModal = () => {
    dispatch(searchSlice.actions.guildFetchingSuccess([]))
    setInputSearchGuildValue('')
    setShowModal(false)
  }

  // Запрос игроков другой гильдии при выборе из списка
  const handleClickSearchValue = (value: ISearchGuild) => {
    dispatch(fetchPlayers(value.entry, realmId))
    changeBracketGroups()
    dispatch(searchSlice.actions.guildFetchingSuccess([]))
    setInputSearchGuildValue('')
    setShowModal(false)
  }

  // Запрос игроков другой гильдии при нажатии кнопки
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue.length === 1) {
      dispatch(fetchPlayers(searchValue[0].entry, realmId))
      changeBracketGroups()
      dispatch(searchSlice.actions.guildFetchingSuccess([]))
      setInputSearchGuildValue('')
      setShowModal(false)
      return
    }
    if (searchValue.length > 1) {
      dispatch(searchSlice.actions.guildSearchMessageResult())
      return
    }
    if (searchValue.length === 0) {
      dispatch(searchSlice.actions.guildSearchMessageEmpty())
      return
    }
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
      const sourcePlayer = currentPlayers[source.index] // current
      const parsedPlayer = {
        id: String(sourcePlayer.guid),
        role: destList.players[destination.index].role,
        name: sourcePlayer.name,
        class_name: sourcePlayer.class_name,
        race: sourcePlayer.race_name,
        ilvl: sourcePlayer.equipment_lvl.avgItemLevel
      }
      let sourceItems = [...constructorPlayers] // ОК
      sourceItems = sourceItems.filter(p => p !== sourcePlayer)
      destItems.splice(destination.index, 1, parsedPlayer); //ОК
      setBracketPlayers({
        ...bracketPlayers,
        [destination.droppableId]: {
          ...destList,
          players: destItems
        }
      }) // ОК
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

  // Подготовка рейда к сохранению на сервере
  const convertBracket = () => {
    const convertGroupName = (group: string) => {
      switch (group) {
        case 'group1':
          return 'I группа'
        case 'group2':
          return 'II группа'
        case 'group3':
          return 'III группа'
        case 'group4':
          return 'IV группа'
        case 'group5':
          return 'V группа'
      }
      return group
    }
    const raidID = Date.now();
    let newBracket: IGroupDB[] = []
    Object.keys(bracketPlayers).forEach(group => {
      bracketPlayers[group].players.forEach(player => {
        newBracket.push({
          ...player,
          note: '',
          group_name: convertGroupName(group),
          raid_id: raidID
        });
      });
    });
    return newBracket;
  }

  // Сохранение нового рейда на сервер, прелоадер и уведомление
  const postBracket = () => {
    setIsShowPostMessage(false)
    setisLoading(true)
    const newBracket = convertBracket()
    dbApi.postBracket(newBracket)
      .then(() => {
        setisLoading(false)
        setIsShowPostMessage(true)
        dispatch(postNewsGuild(
          `Создан новый рейд-состав для ${checkedBracket ? '25ки' : '10ки'}`,
          currentUser
        ))
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false))
  }

  return (
    <section className="constructor">
      <Topbar />
      {isLoading &&
        <div className="background-modal">
          <Preloader addClass="constructor__preloader" />
        </div>}
      {isShowPostMessage && <InfoSlider infoMessage="Рейд сохранён" />}
      <h1 className="constructor__header">Создать состав</h1>
      <div className="constructor__layout-header">
        <h2 className="constructor__name-guld">{nameGuild}</h2>
        <img className="constructor__background-image" src={flag} alt="" />
      </div>
      <div className="constructor__layout">
        <div className="constructor__navigation-options" >
          <div className="brackets-options">
            <label className="left-slider">
              <input type="checkbox" className="constructor__checkbox left-slider__checkbox"
                checked={checkedBracket} onChange={handleChangeBracketCheckbox} />
              <span className="left-slider_name_left"> Для 10ки</span>
              <span className="left-slider__switch"></span>
              <span className="left-slider_name_right">Для 25ки</span>
            </label>
            <button className="reset-brackets-button" type="button"
              onClick={handleClickResetButton}>Сбросить</button>
          </div>
          <form className="guild-selection__form" onSubmit={e => handleSubmitSearch(e)}>
            <label className="right-slider">
              <div className="right-slider__names">
                <span className="right-slider__name">Найти игрока</span>
                <span className="right-slider__name">Сменить гильдию</span>
              </div>
              <input type="checkbox" className="constructor__checkbox right-slider__checkbox"
                checked={checkedSearch} onChange={handleChangeSearchCheckbox} />
              <span className="right-slider__switch"></span>
            </label>
            <select className="constructor__select-realm" disabled={!checkedSearch}
              onChange={(e) => handleSelectTypeSearch(e)} defaultValue={57}>
              <option value={9}>х2</option>
              <option value={33}>х4</option>
              <option value={57}>х5</option>
              <option disabled={true} value={1}>х6 Скоро!</option>
            </select>
            <input type="search" className="guild-selection__input"
              onInput={() => checkedSearch && setShowModal(true)}
              value={checkedSearch ? inputSearchGuildValue : inputSearchPlayerValue}
              onChange={e => handleChangeInputValue(e.target.value)}
            />
            <ul className="guild-selection__placeholder">
              {searchLoading && <li>Загрузка...</li>}
              {searchError && <li style={{ color: "#ab0000", padding: '5px' }}>Сервер не доступен</li>}
              {searchMessage && <li style={{ color: "#ab0000", padding: '5px', fontSize: '0.9rem' }}>
                {searchMessage}</li>}
              {searchValue.length > 0 &&
                searchValue.map((value, index: number) => (
                  <li className="guild-selection__placeholder-item"
                    key={`${value.name}-${index}`} onClick={() => handleClickSearchValue(value)}>
                    {value.name}</li>
                ))}
            </ul>
            <button className="guild-selection__button" disabled={inputSearchGuildValue.length < 2}></button>
          </form>
        </div>
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
                <div className="constructor__table-drag-button" style={{ gridRowEnd: `${currentPlayers.length + 2}` }}></div>
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
                {currentPlayers.map((player, index) =>
                  <Draggable key={player.name} draggableId={player.name} index={index}>
                    {(provided, snapshot) => (
                      <ul className="table__row item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <button type="button" className="table__add-button"
                          onClick={() => handleAddPlayer(player)}></button>
                        <li className="table__cell">{player.name}</li>
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
            >Групповые бафы рас</button>
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
        <button type="button" className="constructor__button" data-title='Доступно только для ГМа и офицеров'
          onClick={postBracket} disabled={!loggedIn}>Отправить</button>
        <button type="button" className="constructor__button" data-title='Изменить стиль и сохранить как картинку'
          onClick={() => setBracketPreviewModal(!bracketPreviewModal)}>Сохранить</button>
      </footer>
      {showModal &&
        <div className="background-modal" onClick={handleCloseModal}></div>
      }
      {bracketPreviewModal &&
        <ModalBrackets
          isClose={() => setBracketPreviewModal(false)}
          bracketPlayers={bracketPlayers}
        />
      }
    </section>
  )
}

export default Constructor
