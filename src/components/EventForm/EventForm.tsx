/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FC, FormEvent, RefObject, useEffect, useRef, useState, MouseEvent } from "react";
import { IEvents } from "../../models/eventsModel";
import { IError } from "../../models/globalError";
import { IPlayer } from "../../models/playerModel";
import { useAppDispatch, useAppSelector, useSearchPlayer } from "../../store/hooks";
import { fetchPlayers } from "../../store/reducers/ActionCreators";
import { scheduleSlice } from "../../store/reducers/scheduleSlice";
import { GUILD_ID, GUILD_REALM_ID } from "../../utils/config";
import { useInput } from "../../utils/Validations";
import Preloader from "../Preloader/Preloader";

interface IProps {
  withEvent: IEvents | null;
  date: Date | null;
  title: string;
  error: IError;
  loading: boolean;
  submit: (event: IEvents) => void;
  onDelete: (id: number) => void;
}

const EventForm: FC<IProps> = ({ withEvent, date, title, error, loading, submit, onDelete }) => {

  const modal: RefObject<HTMLDialogElement> = useRef(null)
  const keyRef: RefObject<HTMLInputElement> = useRef(null);
  const placeholderRef = useRef(null)
  const [showInput, setShowInput] = useState(false);
  const raidleaderInput = useInput(withEvent ? withEvent.raidleader : '', { minLength: 2, isEmpty: true })
  const timeInput = useInput(withEvent ? withEvent.time : '', { minLength: 2, isEmpty: true })
  const selectInput = useInput(withEvent ? withEvent.name : '', { minLength: 2, isEmpty: true })
  const { players } = useAppSelector(state => state.player)
  const [searchName, setSearchName] = useState<IPlayer[]>([])
  const resultSearch = useSearchPlayer(players, raidleaderInput.value)
  const { openEventForm } = useAppSelector(state => state.schedule)
  const dispatch = useAppDispatch()

  // Открытие или закрытие формы
  useEffect(() => {
    openEventForm ? modal.current?.showModal() : modal.current?.close();
  }, [openEventForm])

  // Отправка значение что область должна быть закрыта, при нажатии на 'Escape'
  modal.current?.addEventListener('close', () => {
    dispatch(scheduleSlice.actions.iscloseEventForm())
  })

  // Закрытие формы при нажатии на область
  const closeOnBackDropClick = (evt: MouseEvent<HTMLElement>) => {
    if (evt.target === modal.current) {
      modal.current?.close();
    }
  }

 // Закрытие формы
  const closeForm = () => {
    modal.current?.close()
  }

  // Запрос списка игроков если они ещё не были получены
  useEffect(() => {
    players.length === 0 && dispatch(fetchPlayers(GUILD_ID, GUILD_REALM_ID))
  }, [])

  // Показ предлагаемых игроков если совпадает со значением ввода
  useEffect(() => {
    if (raidleaderInput.value !== resultSearch[0]?.name) {
      setSearchName(resultSearch)
    }
  }, [raidleaderInput.value])

  //  Фокус на поле для собственного названия рейда, при его появлении
  useEffect(() => {
    if (showInput && keyRef.current) {
      keyRef.current.focus()
    }
  }, [showInput, keyRef]);

  // Показ поля для собственного названия рейда, при выборе его из списка
  const handleSelectEvent = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Своё событие') {
      selectInput.setValue('');
      setShowInput(true);
    } else {
      setShowInput(false);
      selectInput.onChange(e)
    }
  }

  // Отправка формы
  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit({
      id: withEvent ? withEvent.id : 0,
      date: date! || withEvent?.date,
      name: selectInput.value,
      raidleader: raidleaderInput.value,
      time: timeInput.value
    })
  }

  // Удаление события
  const handleDeleteEvent = () => {
    onDelete(withEvent!.id)
  }

  // Сохранение значения поля 'РЛ' при выборе из списка предлагаемых вариантов
  const handleClickPlaceholderItem = (value: string) => {
    raidleaderInput.setValue(value)
    setSearchName([])
  }

  return (
    <dialog className='modal modal_style_gold' ref={modal} onClick={(evt) => closeOnBackDropClick(evt)}>
      <div className='modal__wrapper'>
        <h3 className="modal__header modal__header_style_gold">{title}</h3>
        <button type="button" className="modal__close-button"
          onClick={closeForm}> &#215;</button>
        <div className="modal__inner">
          <form className="event-form" onSubmit={(evt) => submitForm(evt)}>
            <label className="event-form__label">Название события
              <select className="event-form__select" value={showInput ? '' : selectInput.value} onChange={(e) => handleSelectEvent(e)}>
                <option value="" hidden>Выбрать...</option>
                <optgroup label="25ки">
                  <option value='ИК 25'>ИК 25</option>
                  <option value='Логово Груула'>Логово Груула</option>
                  <option value='Логово Магдеридона'>Логово Магдеридона</option>
                  <option value='Ульдуар 25'>Ульдуар 25</option>
                  <option value='ИВК 25'>ИВК 25</option>
                  <option value='героик Логово Груула'>героик Логово Груула</option>
                  <option value='героик Логово Магдеридона'>героик Логово Магдеридона</option>
                </optgroup>
                <optgroup label="10ки">
                  <option value='Каражан об'>Каражан об</option>
                  <option value='Каражан гер'>Каражан гер</option>
                  <option value='ИК 10 об'>ИК 10 об</option>
                  <option value='ИВК 10 гер'>ИВК 10 гер</option>
                  <option value='Ульдуар 10'>Ульдуар 10</option>
                </optgroup>
                <option value='Своё событие'>&#10149; Своё событие</option>
              </select>

              {showInput &&
                <><input ref={keyRef} className="event-form__input" type="text" placeholder="Описание своего события"
                  onChange={e => selectInput.onChange(e)} onBlur={selectInput.onBlur} />
                  <span className="event-form__error">
                    {selectInput.isDirty && selectInput.error}
                  </span></>}
            </label>

            <label className="event-form__label">РЛ
              <input className="event-form__input" type="text" value={raidleaderInput.value}
                onBlur={raidleaderInput.onBlur} onChange={e => raidleaderInput.onChange(e)} />
              <span className="event-form__error">
                {raidleaderInput.isDirty && raidleaderInput.error}
              </span>
              <ul className="event-form__placeholder" ref={placeholderRef}>
                {searchName.length > 0 &&
                  searchName.map((value, index: number) => (
                    <li className="event-form__placeholder-item"
                      key={`${value.name}-${index}`} onClick={() => handleClickPlaceholderItem(value.name)}>
                      {value.name}</li>
                  ))}
              </ul>

            </label>

            <label className="event-form__label">Время
              <input className="event-form__input" type="text" value={timeInput.value}
                onBlur={timeInput.onBlur} onChange={e => timeInput.onChange(e)} />
              <span className="event-form__error">
                {timeInput.isDirty && timeInput.error}
              </span>
            </label>
            <button disabled={!selectInput.inputValid || !raidleaderInput.inputValid || !timeInput.inputValid}
              type="submit" className="event-form__button">
              {withEvent ? 'Изменить событие' : 'Создать событие'}
            </button>
            {withEvent &&
              <button type="button" className="event-form__button event-form__button_type_delete"
                onClick={handleDeleteEvent}>Удалить событие</button>}
          </form><div className="event-form__error-response">
            {loading && <Preloader addClass={'lds-spinner_style_l'} />}
            {error.isError && '-- ' + error.message + ' --'}
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default EventForm;
