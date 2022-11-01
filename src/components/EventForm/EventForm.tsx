import { Dispatch, FC, FormEvent, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { IEvents } from "../../models/eventsModel";
import Modal from "../Modal/Modal";

interface IProps {
  setShowingEventForm: Dispatch<SetStateAction<boolean>>;
  date: Date | null;
  title: string;
  submit: (event: IEvents) => void
}

const EventForm: FC<IProps> = ({ setShowingEventForm, title, date, submit }) => {

  const [event, setEvent] = useState<IEvents>({
    date,
    name: '',
    raidleader: '',
    time: ''
  } as IEvents)



  let customKeyValue: string | number | readonly string[] | undefined = 'eded'
  const keyRef: RefObject<HTMLInputElement> = useRef(null);
  const [showKey, setShowKey] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [keyText, setKeyText] = useState("");

  useEffect(() => {
    if (selectedValue === customKeyValue) {
      setShowKey(true);
      if (keyRef.current) {
        console.log(keyRef.current.focus())
      }
    } else {
      setShowKey(false);
    }
  }, [selectedValue, showKey, keyRef]);



  const submitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    submit({ ...event, name: event.name, raidleader: event.raidleader, time: event.time })
  }

  return (

    <Modal onClose={() => setShowingEventForm(false)} title={title}>
      <form className="form" onSubmit={(evt) => submitForm(evt)}>
        <label>Название события
          <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)/* setEvent({ ...event, name: e.target.value }) */}>
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
            <option value={customKeyValue}>Своё событие</option>
          </select>

          {showKey &&
            <input ref={keyRef} className="form__input" type="text" placeholder="Enter key"
            value={keyText} onChange={(e) =>setKeyText(e.target.value)} />
          }
        </label>

        <label>РЛ
          <input type="text" onChange={(e) => setEvent({ ...event, raidleader: e.target.value })} />
        </label>

        <label>Время
          <input type="text" onChange={(e) => setEvent({ ...event, time: e.target.value })} />
        </label>
        <button type="submit">Изменить событие</button>

        {/*         {withEvent ? (
        	<Fragment>
            <button onClick={() => editEvent(event)}>Edit event</button>
            <a className="close" onClick={() => {
            	setShowingEventForm({ visible: false })
            	setViewingEvent(event)}
            }>
              Cancel (go back to event view)
            </a>
          </Fragment>
        ) : (
        	<Fragment>
            <button onClick={() => addEvent(event)}>Add event to calendar</button>
            <a className="close" onClick={() => setShowingEventForm({ visible: false })}>Cancel (go back to calendar)</a>
          </Fragment>
        )} */}
      </form>
    </Modal>
  )
}

export default EventForm;
