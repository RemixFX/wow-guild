/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useRef, MouseEvent, useState, FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBrackets, fetchChangeNote, fetchDeleteBracket } from "../../store/reducers/ActionCreators"
import { classColor, getNameGroupBuff } from "../../utils/config"
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import InfoSlider from "../InfoSlider/infoSlider";
import Preloader from "../Preloader/Preloader";
import Topbar from "../Topbar/Topbar"

const Brackets = () => {

  const dispatch = useAppDispatch();
  const { brackets, error, loading, errorLoadingNote, loadingNote, errorDeleteBracket } = useAppSelector(state => state.brackets)
  const { loggedIn } = useAppSelector(state => state.admin)
  const modal: RefObject<HTMLDialogElement> = useRef(null)
  const inputValue: RefObject<HTMLTextAreaElement> = useRef(null)
  const [data, setData] = useState({ raidID: '', playerID: '', playerNote: '' })


  useEffect(() => {
    dispatch(fetchBrackets())
  }, [])

  const handleOpenModal = (raidID: string, playerID: string, playerNote: string) => {
    inputValue.current!.value = playerNote
    modal.current?.showModal()
    setData({ raidID, playerID, playerNote })
  }

  const changeNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    modal.current?.close()
    dispatch(fetchChangeNote(inputValue.current!.value, data.playerID, data.raidID))
  }

  const closeOnBackDropClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === modal.current) {
      modal.current?.close();
    }
  }

  const deleteBracket = (id: string) => {
    dispatch(fetchDeleteBracket(id))
  }


  if (loading) {
    return (
      <section className="brackets">
        <Preloader addClass="constructor__preloader" />
      </section>
    )
  } if (error) {
    return (
      <section className="brackets">
        <Topbar />
        <h1 className="brackets__error-message">Нет ответа от сервера...</h1>
      </section>
    )
  }
  return (
    <section className="brackets">
      <Topbar />
      {errorLoadingNote.isError && <InfoSlider infoMessage={errorLoadingNote.message} error={true} />}
      {errorDeleteBracket.isError && <InfoSlider infoMessage={errorDeleteBracket.message} error={true} />}
      <div className="bracket">
        <h1 className="bracket__header">Составы 25ки:</h1>
        {brackets.raid25.map((bracket) =>
          <div className="bracket__block" key={bracket.raidID}>
            <div className="bracket__raid-info">
              <h2 className="bracket__raid-header">header 123</h2>
              <div className="bracket__raid-tools">
                <span className="bracket__raid-id">id рейда: {bracket.raidID}</span>
                <div className="bracket__raid-buttons">
                  <ConfirmDelete confirmationAccepted={() => deleteBracket(bracket.raidID)} />
                  <button className="bracket__button-changename"
                    type="button"></button>
                </div>
              </div>
            </div>
            <div className="bracket__raid_page_bracket">
              {Object.entries(bracket.raid).map(([groupName, groupPlayers]) =>
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
                       ${(player.id === data.playerID && loadingNote) && 'bracket__loading-button'}`}
                            onClick={() => handleOpenModal(bracket.raidID, player.id, player.note)}></button>
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
          </div>
        )}
        <h1 className="bracket__header">Составы 10ки:</h1>
        {brackets.raid10.map((bracket) =>
          <div className="bracket__block" key={bracket.raidID}>
            <div className="bracket__raid-info">
              <h2 className="bracket__raid-header">header 123</h2>
              <div className="bracket__raid-tools">
                <span className="bracket__raid-id">id рейда: {bracket.raidID}</span>
                <div className="bracket__raid-buttons">
                  <ConfirmDelete confirmationAccepted={() => deleteBracket(bracket.raidID)} />
                  <button className="bracket__button-changename"
                    type="button"></button>
                </div>
              </div>
            </div>
            <div className="bracket__raid_page_bracket">
              {Object.entries(bracket.raid).map(([groupName, groupPlayers]) =>
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
                       ${(player.id === data.playerID && loadingNote) && 'bracket__loading-button'}`}
                            onClick={() => handleOpenModal(bracket.raidID, player.id, player.note)}></button>
                        }
                      </ul>
                    )}
                    <ul className="bracket__group-buffs">
                      <li className="bracket__group-buff">{getNameGroupBuff(groupPlayers)}</li>
                    </ul>
                  </div>
                </div>
              )}
              <div className="bracket__raid-border"></div>
            </div>
          </div>
        )}
      </div>
      <dialog className="brackets__modal" ref={modal} onClick={(e) => closeOnBackDropClick(e)}>
        <form className="brackets__form" onSubmit={e => changeNote(e)}>
          <textarea className="brackets__form-input" ref={inputValue}></textarea>
          <div className="brackets__modal-buttons">
            <button className="brackets__modal-button">Сохранить</button>
            <button type="button" className="brackets__modal-button"
              onClick={() => modal.current?.close()}>Закрыть</button>
          </div>
        </form>
      </dialog>
    </section>
  )
}

export default Brackets
