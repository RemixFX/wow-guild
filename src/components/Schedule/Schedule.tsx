/* eslint-disable react-hooks/exhaustive-deps */
import { WheelEvent, useState, useMemo, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';
import { IEvents } from "../../models/eventsModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchChangeEvents, fetchCreateEvents, fetchDeleteEvents, postNewsGuild } from "../../store/reducers/ActionCreators";
import { scheduleSlice } from "../../store/reducers/scheduleSlice";
import { cardStyle } from "../../utils/config";
import EventForm from "../EventForm/EventForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Topbar from "../Topbar/Topbar";

const Schedule = () => {

  interface IArrAllDays {
    date: Date;
    eventsOfDay: IEvents[]
  }

  const nowDate = new Date();
  const arrMonthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const nowDateNumber = nowDate.getDate()
  const nowMonth = nowDate.getMonth()
  const nowYear = nowDate.getFullYear()
  const nowDateWithoutTime = new Date(nowYear, nowMonth, nowDateNumber)
  const monthDays = new Date(nowYear, nowMonth + 1, 0).getDate()
  const previousMonthDays = new Date(nowYear, nowMonth, 0).getDate()
  const nextMonthDays = new Date(nowYear, nowMonth + 2, 0).getDate()
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector(state => state.admin)
  const { events, loading, loadingEvent, error, errorForm, openEventForm } = useAppSelector(state => state.schedule)
  const { currentUser } = useAppSelector(state => state.admin)

  // Создание массива со всеми датами на предыдущий, текущий и следующий месяц
  let arrAllDays: IArrAllDays[] = useMemo(() => {
    const arr: IArrAllDays[] = []
    const startingDate = new Date(nowYear, nowMonth - 1)
    for (let i = 0; i < previousMonthDays + monthDays + nextMonthDays; i++) {
      const date = new Date(startingDate)
      arr.push({ date, eventsOfDay: [] })
      startingDate.setDate(startingDate.getDate() + 1)
    }
    console.log('массив дат создан')
    return arr
  }, [])

  // Сортировка событий дня по полю 'time'

  const sortEvents = (sortArr: IEvents[]) => {
    return sortArr.sort((a, b) => {
      if (a.time > b.time) {
        return 1
      }
      if (a.time < b.time) {
        return -1
      }
      return 0
    })
  }

  // Сравнение дат массива и дат событий
  const findEvents = (date: Date) => {
    const filteredEvents = events.filter((event) => new Date(event.date).getTime() === date.getTime())
    return sortEvents(filteredEvents)
  }

  // Добавление событий в массив с датами, если события загружены
  if (events.length !== 0) {
    arrAllDays.map((event) => event.eventsOfDay = findEvents(event.date)
    )
  }

  // Поиск индекса с текущей датой в массиве
  const indexCurrentData = arrAllDays.findIndex(((element) =>
    element.date.getTime() === nowDateWithoutTime.getTime()))

  // Получение массива дат, на текущую дату + 7 дней
  const currentArr: IArrAllDays[] = arrAllDays.slice(indexCurrentData, indexCurrentData + 7)

  const [data, setData] = useState(currentArr)
  const [index, setIndex] = useState(1)
  const [isScrollUp, setIsScrollUp] = useState(false)
  const [isScrollDown, setIsScrollDown] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<IEvents | null>(null)

  // Очистка переменных для формы
  useEffect(() => {
    if (!openEventForm) {
      setSelectedDate(null)
      setSelectedEvent(null)
    }
  }, [openEventForm])

  //Обновление отображаемого массива в зависимости от скролла
  const hundleMouseScroll = (e: WheelEvent) => {
    setIsScroll(true)

    if (e.deltaY < 0) {
      setIsScrollDown(false)
      setIsScrollUp(true)
      if (index > indexCurrentData) return
      setData((data.unshift(
        arrAllDays[indexCurrentData - index]
      ), data).slice(0, 7));
      setIndex(index + 1)
    } else {
      setIsScrollUp(false)
      setIsScrollDown(true)
      if (-(index - 9) + indexCurrentData > arrAllDays.length) return
      setData((data.push(
        arrAllDays[indexCurrentData - (index - 8)]
      ), data).slice(1, 8));
      setIndex(index - 1)
    }
  }

  // Открытие формы для создания события
  const handleOpenModal = (date: Date) => {
    if (loggedIn && date! >= nowDateWithoutTime) {
      setSelectedDate(date)
      dispatch(scheduleSlice.actions.isOpenEventForm())
    } else return
  }

  // Открытие формы для изменения события
  const handleOpenModalWithEvent = (event: IEvents) => {
    setSelectedEvent({ ...event, date: new Date(event.date) })
    dispatch(scheduleSlice.actions.isOpenEventForm())
  }

  //Создание события
  const createEvent = (event: IEvents) => {
    dispatch(fetchCreateEvents(event))
    dispatch(postNewsGuild(
      `Создан новый рейд в расписании на ${event.date.getDate() + ' ' + arrMonthName[event.date.getMonth()]}`,
      currentUser
    ))
  }

  // Изменение события
  const changeEvent = (event: IEvents) => {
    dispatch(fetchChangeEvents(event))
    dispatch(postNewsGuild(
      `Изменилась информация в расписании рейдов на ${event.date.getDate() + ' ' + arrMonthName[event.date.getMonth()]}`,
      currentUser
    ))
  }

  // Удаление события
  const deleteEvent = (id: number) => {
    dispatch(fetchDeleteEvents(id))
  }

  // Получение заголовка для формы
  const createTitle = () => {
    if (selectedDate) {
      return `Создать событие на ${selectedDate.getDate() + ' ' + arrMonthName[selectedDate.getMonth()]}`
    }
    else if (selectedEvent) {
      return `Изменить событие на ${selectedEvent.date.getDate() + ' ' + arrMonthName[selectedEvent.date.getMonth()]}`
    } else
      return ''
  }

  return (
    <section className="schedule">
      <Topbar />
      <h1 className="schedule__header">Расписание рейдов</h1>
      <CSSTransition
        in={!isScroll}
        classNames={`${(isScrollUp && 'scrollup') || (isScrollDown && 'scrolldown')}`}
        timeout={290}
        onExit={() => setIsScroll(false)}
      >
        <div className='schedule__block' onWheel={hundleMouseScroll} >

          {data.map((element, index) =>
            <article className='card' key={index}>
              <p className="card__date">{`${nowDateWithoutTime.getTime() === element.date.getTime() ? 'Cегодня,' : ''}
             ${element.date.getDate()} ${arrMonthName[element.date.getMonth()]}`}
                {error.isError && <span className="card__event-error">{error.message}</span>}
              </p>
              <div className="card__layout-element">

                {element.eventsOfDay.map((event) =>
                  <div className="card__element" style={cardStyle(event)} key={event.id}>
                    <div className="card__element-top">
                      <span className="card__element-title">{event.name}</span>
                      {loggedIn && <button className="card__change-event-button"
                        onClick={() => { handleOpenModalWithEvent(event) }}></button>}
                    </div>
                    <span className="card__element-owner">{event.raidleader}</span>
                    <span className="card__element-time">{event.time}</span>
                  </div>)}
                {loading ? <Preloader addClass={''} /> :
                  element.eventsOfDay.length < 4 &&
                  <div className={`card__element ${(loggedIn && element.date >= nowDateWithoutTime)
                    && 'card__element_admin'}`} onClick={() => handleOpenModal(element.date)} >
                    <div className="card__element-top">
                      <span className="card__element-title"></span>
                    </div>
                    <span className="card__element-owner"></span>
                    <span className="card__element-time"></span>
                  </div>
                }
              </div>
            </article>
          )}
        </div>
      </CSSTransition>
      {(selectedEvent || selectedDate) &&
        <EventForm
          date={selectedDate}
          withEvent={selectedEvent}
          error={errorForm}
          loading={loadingEvent}
          submit={selectedDate ? createEvent : changeEvent}
          onDelete={deleteEvent}
          title={createTitle()}
        />}
      <Footer />
    </section>
  )
}

export default Schedule
