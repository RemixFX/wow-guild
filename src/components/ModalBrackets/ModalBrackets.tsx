import html2canvas from "html2canvas"
import { FC, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import { IGroupData } from "../../models/bracketsModel";
import { changeModalBracketBackground, classColor, getNameGroupBuff } from "../../utils/config"
import { HexColorPicker } from "react-colorful";
import HeaderInput from "../HeaderInput/HeaderInput";

interface IProps {
  isClose: MouseEventHandler<HTMLButtonElement>;
  bracketPlayers: Record<string, IGroupData>
}

const ModalBrackets: FC<IProps> = ({ isClose, bracketPlayers }) => {
  const successImg = require('../../images/success.png')
  const modalRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const [isOpenTextInput, setIsOpenTextInput] = useState(false)
  const [textInputValue, setTextInputValue] = useState('')
  const [isOpenSelectInput, setIsOpenSelectInput] = useState(false)
  const [selectInputValue, setSelectInputValue] = useState('')
  const [isOpenColorPalette, setIsOpenColorPalette] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [color, setColor] = useState("#ffc200");

  const groupsInBracket: number = Object.keys(bracketPlayers).length > 2 ? 25 : 10

  const handleClickDownloadButton = () => {
      html2canvas(modalRef.current as HTMLElement, { backgroundColor: null, scale: 2.0 })
      .then(function (canvas) {
        const url = canvas.toDataURL("image/png", 1)
        const link = document.createElement("a");
        link.href = url
        link.setAttribute('download', textInputValue ? textInputValue :
        groupsInBracket === 25 ? '25ка' : '10ка')
        link.click()
      });
  }

  const handleClickCopyButton = async () => {
    html2canvas(modalRef.current as HTMLElement, { backgroundColor: null, scale: 1.4 })
      .then((canvas) => {
        canvas.toBlob((blob: Blob | null) => blob && navigator.clipboard.write(
           [new window.ClipboardItem({[blob.type]: blob})]
        ))
        setIsCopied(true)
      })
      .catch((err) => console.log(err))
  }

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

  useEffect(() => {
    setIsOpenSelectInput(false)
  }, [selectInputValue])

  const handleClickModal = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLDivElement
    if (isOpenTextInput && e.target !== inputRef.current) {
      setIsOpenTextInput(false)
    }
    if (isOpenColorPalette && !(target.classList.contains('react-colorful__interactive')
      || target.classList.contains('react-colorful__pointer'))) {
      setIsOpenColorPalette(false)
    }
    if (isOpenSelectInput && e.target !== selectRef.current) {
      setIsOpenSelectInput(false)
    }
  }

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      evt.key === 'Escape' && setIsOpenColorPalette(false)
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpenColorPalette])

  return (
    <div className="modal-background">
      <div className="modal-layout">
        <button className="modal-button modal-close-button" type="button"
          onClick={isClose}></button>
        <button className="modal-button modal-options-button modal-options-button_type_change-name"
          type="button"
          onClick={() => setIsOpenTextInput(true)}>Изменить название</button>
        <button className={`modal-button modal-options-button modal-options-button_type_change-font
             ${isOpenColorPalette && 'animation-opacity'}`} type="button"
          onClick={() => setIsOpenColorPalette(true)}>Изменить шрифт</button>
        <button className={`modal-button modal-options-button modal-options-button_type_change-background
             ${isOpenSelectInput && 'animation-opacity'}`} type="button"
          onClick={() => setIsOpenSelectInput(true)}>Изменить стиль</button>
        <button className="modal-button modal-download-button" type="button" disabled={isOpenTextInput}
          onClick={handleClickDownloadButton} data-title='Cкачать как картинку'></button>
        <button className="modal-button modal-copy-button" type="button" disabled={isOpenTextInput}
          onClick={handleClickCopyButton} style={{ backgroundImage: isCopied ? `url(${successImg})` : '' }}
          onBlur={() => setIsCopied(false)} data-title='Скопировать. Используйте Ctrl+V в дискорд'></button>
        <section className="modal-brackets" ref={modalRef} onClick={e => handleClickModal(e)}
          style={changeModalBracketBackground(selectInputValue)}>
            {isOpenColorPalette &&
              <div className="modal-brackets__color-input" ref={paletteRef}>
                <HexColorPicker className="animation-appear" color={color} onChange={setColor} />
              </div>
            }
            {isOpenSelectInput &&
              <select className="modal-brackets__input-select" ref={selectRef}
                value={selectInputValue} onChange={e => setSelectInputValue(e.target.value)}>
                <option value='По умолчанию'>По умолчанию</option>
                <option value='Лёд'>Лёд</option>
                <option value='Синдрагоса'>Синдрагоса</option>
                <option value='Король Лич'>Король Лич</option>
                <option value='Портал'>Портал</option>
                <option value='Орда'>Орда</option>
                <option value='Альянс'>Альянс</option>
                <option value='Смертокрыл'>Смертокрыл</option>
                <option value='HeartStone'>HeartStone</option>
                <option value='Пергамент'>Пергамент</option>
                <option value='Crystal'>Crystal</option>
              </select>
            }
              <HeaderInput isOpenTextInput={isOpenTextInput} inputRef={inputRef}
               inputValue={(value: string) => setTextInputValue(value)}/>
            <div className="bracket__raid">
              {Object.entries(bracketPlayers).map(([groupId, group]) =>
                <div className="bracket__group" key={groupId}
                 style={{width: groupsInBracket === 10 ? '48%' : '32%'}}>
                  <ul className="bracket__notations">
                    <li className="bracket__notation">Роль</li>
                    <li className="bracket__notation">Имя</li>
                    <li className="bracket__notation">Класс</li>
                    <li className="bracket__notation">Раса</li>
                    <li className="bracket__notation">Ilvl</li>
                  </ul>
                  <div className="bracket__players">
                    <h2 className="bracket__title">{group.title}</h2>
                    {group.players.map((bplayer) =>
                      <ul className="bracket__row" key={bplayer.id} style={{ color: color }}>
                        <li className="bracket__cell">{bplayer.role}</li>
                        <li className="bracket__cell">{bplayer.name}</li>
                        <li className="bracket__cell" style={classColor(bplayer)}>
                          {bplayer.class_name}
                        </li>
                        <li className="bracket__cell">{bplayer.race}</li>
                        <li className="bracket__cell">{bplayer.ilvl ? bplayer.ilvl : ""}</li>
                      </ul>
                    )}
                    <ul className="bracket__group-buffs bracket__group-buffs_style_modal">
                      <li className="bracket__group-buff">{getNameGroupBuff(group.players)}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
        </section>
      </div>
    </div>
  )
}

export default ModalBrackets
