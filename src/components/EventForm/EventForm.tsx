import { ChangeEvent, FC, FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { IEvents } from "../../models/eventsModel";
import { useInput } from "../../utils/Validations";
import Modal from "../Modal/Modal";

interface IProps {
  withEvent: IEvents | null;
  date: Date | null;
  title: string;
  submit: (event: IEvents) => void;
  onDelete: (id: number) => void;
}

const EventForm: FC<IProps> = ({ withEvent, date, title, submit, onDelete }) => {

  const keyRef: RefObject<HTMLInputElement> = useRef(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (showInput && keyRef.current) {
      keyRef.current.focus()
    }
  }, [showInput, keyRef]);

  const handleSelectEvent = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Своё событие') {
      selectInput.setValue('');
      setShowInput(true);
    } else {
      setShowInput(false);
      selectInput.onChange(e)
    }
  }

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

  const handleDeleteEvent = () => {
    onDelete(withEvent!.id)
  }

  const raidleaderInput = useInput(withEvent ? withEvent.raidleader : '', {minLength: 2, isEmpty: true })
  const timeInput = useInput(withEvent ? withEvent.time : '', { minLength: 2, isEmpty: true })
  const selectInput = useInput(withEvent ? withEvent.name : '', { minLength: 2, isEmpty: true })

  return (
    <Modal title={title}>
      <form className="event-form" onSubmit={(evt) => submitForm(evt)}>
        <label className="event-form__label" >Название события
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
              </span></>
          }
        </label>

        <label className="event-form__label">РЛ
          <input className="event-form__input" type="text" value={raidleaderInput.value}
            onBlur={raidleaderInput.onBlur} onChange={e => raidleaderInput.onChange(e)} />
          <span className="event-form__error">
            {raidleaderInput.isDirty && raidleaderInput.error}
          </span>
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
          onClick={handleDeleteEvent}>Удалить событие</button>
        }
      </form>
      </Modal>
  )
}

export default EventForm;
