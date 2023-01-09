import html2canvas from "html2canvas"
import { FC, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react"
import { IGroupData } from "../../models/bracketsModel";
import { changeModalBracketBackground, classColor, getNameGroupBuff } from "../../utils/config"

interface IProps {
  isClose: MouseEventHandler<HTMLButtonElement>;
  bracketPlayers: Record<string, IGroupData>
}

const ModalBrackets: FC<IProps> = ({ isClose, bracketPlayers }) => {

  const modalRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLSelectElement>(null)
  const [image, setImage] = useState('')
  const [isOpenTextInput, setIsOpenTextInput] = useState(false)
  const [textInputValue, setTextInputValue] = useState('')
  const [isOpenSelectInput, setIsOpenSelectInput] = useState(false)
  const [selectInputValue, setSelectInputValue] = useState('')


  /*       useEffect(() => {
          html2canvas(modalRef.current as HTMLElement, { backgroundColor: null, scale: 2.0 }).then(function (canvas) {
            const url = canvas.toDataURL("image/png", 1)
            setTimeout(() => setImage(url), 0)
          });
        }, []) */

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
    if (isOpenTextInput && e.target !== inputRef.current) {
      setIsOpenTextInput(false)
    }
    if (isOpenSelectInput && e.target !== selectRef.current) {
      setIsOpenSelectInput(false)
    }
  }



  return (
    <div className="modal-background">
      <div className="modal-layout">
        <button className="modal-button modal-close-button" type="button"
          onClick={isClose} style={{ right: image && "-1%" }}></button>
        {!image ?
          <>
            <button className="modal-button modal-options-button modal-options-button_type_change-name" type="button"
              onClick={() => setIsOpenTextInput(true)}>Изменить название</button>
            <button className={`modal-button modal-options-button modal-options-button_type_change-font ${isOpenSelectInput && 'animation-opacity'}`} type="button"
              onClick={() => setIsOpenSelectInput(true)}>Изменить шрифт</button>
            <button className={`modal-button modal-options-button modal-options-button_type_change-background ${isOpenSelectInput && 'animation-opacity'}`} type="button"
              onClick={() => setIsOpenSelectInput(true)}>Изменить стиль</button>
            <section className="modal-brackets" ref={modalRef} onClick={e => handleClickModal(e)}
              style={changeModalBracketBackground(selectInputValue)}>
              <div className="bracket">
                {isOpenTextInput ?
                  <input className="modal-brackets__input-header" ref={inputRef}
                    value={textInputValue} onChange={e => setTextInputValue(e.target.value)} /> :
                  <h1 className="modal-brackets__header">{textInputValue}</h1>}
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
                <div className="bracket__raid">
                  {Object.entries(bracketPlayers).map(([groupId, group]) => <div className="bracket__group" key={groupId}>
                    <ul className="bracket__notations">
                      <li className="bracket__notation">Роль</li>
                      <li className="bracket__notation">Имя</li>
                      <li className="bracket__notation">Класс</li>
                      <li className="bracket__notation">Раса</li>
                      <li className="bracket__notation">Ilvl</li>
                    </ul>
                    <div className="bracket__players">
                      <h2 className="bracket__title">{group.title}</h2>
                      {group.players.map((bplayer) => <ul className="bracket__row" key={bplayer.id}>
                        <li className="bracket__cell">{bplayer.role}</li>
                        <li className="bracket__cell">{bplayer.name}</li>
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

            </section></>
          :

          <img className="modal-brackets__image" src={image} alt="" />

        }
      </div>
    </div>

  )
}


export default ModalBrackets


/* showResult()
  function showResult() {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.getElementById('btn').addEventListener('click', () => {
      copyToClipboard('https://openjavascript.info/code-lives/projects/images/bike.jpg');
    });
    function writeToCanvas(src: string) {
      return new Promise((res, rej) => {
        img.src = src;
        img.onload = function () {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ctx!.drawImage(img, 0, 0)
          canvas.toBlob((blob) => {
            res(blob);
          }, 'image/png');
        }
      });
    }
    async function copyToClipboard(src: string) {
      const image = await writeToCanvas(src);
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [image.type]: image,
          })
        ]);
        alert("Success");
      } catch (e) {
*/
