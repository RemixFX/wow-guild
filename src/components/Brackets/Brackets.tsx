/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect, useRef, MouseEvent, useState, FormEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBrackets, fetchChangeNote } from "../../store/reducers/ActionCreators"
import Bracket from "../Bracket/Bracket";
import InfoSlider from "../InfoSlider/infoSlider";
import Preloader from "../Preloader/Preloader";
import Topbar from "../Topbar/Topbar"

const Brackets = () => {

  const dispatch = useAppDispatch();
  const { brackets, error, loading, castomError } = useAppSelector(state => state.brackets)
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
    <section className="brackets" >
      <Topbar />
      {castomError.isError && <InfoSlider infoMessage={castomError.message} error={true} />}
        <h1 className="brackets__header">Составы 25ки:</h1>
        {brackets.raid25.map((bracket) =>
          <ul className="brackets__list" key={bracket.raidID}>
            <Bracket bracket={bracket} handleOpenModal={handleOpenModal} id={data.playerID}/>
          </ul>
        )}
        <h1 className="brackets__header">Составы 10ки:</h1>
        {brackets.raid10.map((bracket) =>
          <ul className="brackets__list" key={bracket.raidID}>
            <Bracket bracket={bracket} handleOpenModal={handleOpenModal} id={data.playerID}/>
        </ul>
        )}

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
