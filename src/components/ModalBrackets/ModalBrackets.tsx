import html2canvas from "html2canvas"
import { FC, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import { IGroupData } from "../../models/bracketsModel";
import { classColor, getNameGroupBuff } from "../../utils/config"
import { useInput } from "../../utils/Validations";

interface IProps {
  isClose: MouseEventHandler<HTMLButtonElement>;
  bracketPlayers: Record<string, IGroupData>
}

const ModalBrackets: FC<IProps> = ({ isClose, bracketPlayers }) => {

  const modalRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState('')
  const [isOpenDialogInput, setIsOpenDialogInput] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const bracketNameInput = useInput('', { isEmpty: true })

    useEffect(() => {
      html2canvas(modalRef.current as HTMLElement, { backgroundColor: null, scale: 2.0 }).then(function (canvas) {
        const url = canvas.toDataURL("image/png", 1)
        setTimeout(() => setImage(url), 0)
      });
    }, [])

    useEffect(() => {
      isOpenDialogInput && inputRef.current!.focus()
    },[isOpenDialogInput])

    const handleClickModal = (e: MouseEvent<HTMLElement>) => {
      if (isOpenDialogInput && e.target !== inputRef.current)
      setIsOpenDialogInput(false)
    }


  return (
    <div className="modal-background">
      <div className="modal-layout">
        <button className="modal-brackets-close-button" type="button"
          onClick={isClose}></button>
        <button className="modal-brackets-change-name-button" type="button"
          onClick={() => setIsOpenDialogInput(true)}>Изменить название</button>
        {!image ?
          <section className="modal-brackets" ref={modalRef} onClick={e => handleClickModal(e)}>
            <div className="bracket">
              {isOpenDialogInput ?
                <input className="modal-brackets__input-header" ref={inputRef}
                value={bracketNameInput.value} onChange={e => bracketNameInput.onChange(e)}/> :
                <h1 className="modal-brackets__header">{bracketNameInput.value}</h1>
              }
              <div className="bracket__raid">
                {Object.entries(bracketPlayers).map(([groupId, group]) =>
                  <div className="bracket__group" key={groupId}>
                    <ul className="bracket__notations">
                      <li className="bracket__notation">Роль</li>
                      <li className="bracket__notation">Имя</li>
                      <li className="bracket__notation">Класс</li>
                      <li className="bracket__notation">Раса</li>
                      <li className="bracket__notation">Ilvl</li>
                    </ul>
                    <div className="bracket__players" >
                      <h2 className="bracket__title">{group.title}</h2>
                      {group.players.map((bplayer) =>
                        <ul className="bracket__row" key={bplayer.id}>
                          <li className="bracket__cell">{bplayer.role}</li>
                          <li className="bracket__cell" >{bplayer.name}</li>
                          <li className="bracket__cell" style={classColor(bplayer)}>
                            {bplayer.class_name}
                          </li>
                          <li className="bracket__cell">{bplayer.race}</li>
                          <li className="bracket__cell">{bplayer.ilvl ? bplayer.ilvl : ""}</li>
                        </ul>
                      )}
                      <ul className="bracket__group-buffs">
                        <li className="bracket__group-buff">{getNameGroupBuff(group.players)}</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </section>
          :

          <img className="modal-brackets__image" src={image} alt="" />

        }
      </div>
    </div>

  )
}


export default ModalBrackets



