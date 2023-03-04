import { useEffect, useRef, useState, MouseEvent } from "react"
import { IBracket } from "../../models/bracketsModel"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchChangeNameBracket, fetchDeleteBracket } from "../../store/reducers/ActionCreators"
import { classColor, getNameGroupBuff } from "../../utils/config"
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete"
import HeaderInput from "../HeaderInput/HeaderInput"

const Bracket = (props: {bracket: IBracket, handleOpenModal: (arg0: string, arg1: string, arg2: string) => void, id: string}) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpenTextInput, setIsOpenTextInput] = useState(false)
  const { loadingNote } = useAppSelector(state => state.brackets)
  const { loggedIn } = useAppSelector(state => state.admin)
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputRef.current && isOpenTextInput) {
      inputRef.current.focus()
    }
    const handleKeyDown = (evt: KeyboardEvent) => {
      evt.key === 'Enter' && setIsOpenTextInput(false)
    }
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpenTextInput])

  const handleClickPage = (e: MouseEvent<HTMLElement>) => {
    if (isOpenTextInput && e.target !== inputRef.current) {
      setIsOpenTextInput(false)
    }
  }

  const deleteBracket = (id: string) => {
    dispatch(fetchDeleteBracket(id))
  }

  const handleInputValue = (value: string) => {
    dispatch(fetchChangeNameBracket(value, props.bracket.raidID))
  }

  return (
    <li className="bracket" onClick={handleClickPage}>
      <div className="bracket__raid-info">
        <HeaderInput isOpenTextInput={isOpenTextInput} inputRef={inputRef}
         inputValue={handleInputValue} title={props.bracket.raidName}/>
        <div className="bracket__raid-tools">
          <span className="bracket__raid-id">id рейда: {props.bracket.raidID}</span>
          <div className="bracket__raid-buttons">
            <ConfirmDelete confirmationAccepted={() => deleteBracket(props.bracket.raidID)} />
            <button className="bracket__button-changename" onClick={() => setIsOpenTextInput(true)}
              type="button"></button>
          </div>
        </div>
      </div>
      <div className="bracket__raid_page_bracket">
        {Object.entries(props.bracket.raid).map(([groupName, groupPlayers]) =>
          <div className="bracket__group bracket__group_page_bracket" key={groupName}>
            <ul className="bracket__notations_page_bracket">
              <li className="bracket__notation">Роль</li>
              <li className="bracket__notation">Имя</li>
              <li className="bracket__notation">Класс</li>
              <li className="bracket__notation">Раса</li>
              <li className="bracket__notation">Заметка</li>
            </ul>
            <div className="bracket__players">
              <h2 className="bracket__group-title">{groupName}</h2>
              {groupPlayers.map((player) =>
                <ul className="bracket__row_page_bracket" key={player.id}>
                  <li className="bracket__cell bracket__cell_page_bracket">{player.role}</li>
                  <li className="bracket__cell bracket__cell_page_bracket">{player.name}</li>
                  <li className="bracket__cell bracket__cell_page_bracket" style={classColor(player)}>
                    {player.class_name}
                  </li>
                  <li className="bracket__cell bracket__cell_page_bracket">{player.race}</li>
                  <li className="bracket__cell bracket__cell_page_bracket" data-title={player.note}>{player.note}</li>
                  {loggedIn &&
                    <button type="button" className={`bracket__edit-note-button
                       ${(player.id === props.id && loadingNote) && 'bracket__loading-button'}`}
                      onClick={() => props.handleOpenModal(props.bracket.raidID, player.id, player.note)}></button>
                  }
                </ul>
              )}
              <ul className="bracket__group-buffs bracket__group-buffs_color_black">
                <li className="bracket__group-buff">{getNameGroupBuff(groupPlayers)}</li>
              </ul>
            </div>
          </div>
        )}
        <div className="bracket__raid-border"></div>
      </div>
    </li>
  )
}

export default Bracket
