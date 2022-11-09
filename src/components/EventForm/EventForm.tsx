import { ChangeEvent, FC, FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { IEvents } from "../../models/eventsModel";
import Modal from "../Modal/Modal";

interface IProps {
  withEvent: IEvents | null;
  onClose: () => void;
  date: Date | null;
  title: string;
  submit: (event: IEvents) => void;
  onDelete: (event: IEvents) => void;
}

const EventForm: FC<IProps> = ({ withEvent, onClose, title, date, submit, onDelete }) => {

  const [event, setEvent] = useState(withEvent ? withEvent : {
    date,
    name: '',
    raidleader: '',
    time: ''
  } as IEvents)
  const keyRef: RefObject<HTMLInputElement> = useRef(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (showInput && keyRef.current) {
      keyRef.current.focus()
    }
  }, [showInput, keyRef]);

  const handleSelectEvent = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'Своё событие') {
      setShowInput(true);
    } else {
      setShowInput(false);
      setEvent({ ...event, name: e.target.value })
    }
  }

  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit({ ...event, name: event.name, raidleader: event.raidleader, time: event.time })
  }

  const handleDeleteEvent = () => {
    onDelete(event)
  }

  return (

    <Modal onClose={() => onClose()} title={title}>
      <form className="form" onSubmit={(evt) => submitForm(evt)}>
        <label>Название события
          <select defaultValue={withEvent?.name} onChange={(e) => handleSelectEvent(e)}>
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
            <input ref={keyRef} className="form__input" type="text" placeholder="Описание своего события"
              onChange={(e) => setEvent({ ...event, name: e.target.value })} />
          }
        </label>

        <label>РЛ
          <input type="text" defaultValue={withEvent?.raidleader} onChange={(e) => setEvent({ ...event, raidleader: e.target.value })} />
        </label>

        <label>Время
          <input type="text" defaultValue={withEvent?.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} />
        </label>
        <button type="submit" className="form__button">{withEvent ? 'Изменить событие' : 'Создать событие'}</button>
        {withEvent &&
          <button type="button" className="form__button_type_delete" onClick={handleDeleteEvent}>Удалить событие</button>
        }
      </form>
    </Modal>
  )
}

export default EventForm;
