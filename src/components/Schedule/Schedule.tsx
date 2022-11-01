import React, { WheelEvent, useState, useEffect, useCallback, useMemo } from "react";
import { CSSTransition } from 'react-transition-group';
import { IEvents } from "../../models/eventsModel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchEvents } from "../../store/reducers/ActionCreators";
import { dbApi } from "../../utils/Api";
import EventForm from "../EventForm/EventForm";

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

  // Запрос массива созданных событий
  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const { loggedIn } = useAppSelector(state => state.admin)
  const { events, loading, error } = useAppSelector(state => state.schedule)

  // Создание массива со всеми датами на предыдущий, текущий и следующий месяц
  const arrAllDays: IArrAllDays[] = useMemo(() => {
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

  // Сравнение дат массива и дат событий
  const findEvents = (date: IArrAllDays["date"]) => {
    return events.filter((event) => new Date(event.date).getTime() === date.getTime())
  }

  // Добавление событий в массив с датами, если события загружены
  if (events.length !== 0) {
    console.log('события загружены', events)
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
  const [toggleStyle, setToggleStyle] = useState(false)
  const [showingEventForm, setShowingEventForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  //Обновление отображаемого массива в зависимости от скролла
  const hundleMouseUp = (e: WheelEvent) => {
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

  // Стиль событий в зависимости от названия события
  const cardStyle = (event: IEvents) => {
    if (loading) {
      return { backgroundColor: 'white' }
    }
    let background;
    switch (event.name) {
      case 'ИК 25':
        background = { backgroundColor: '#3973e9' }
        break;
      case 'Логово Груула':
        background = { backgroundColor: '#7e5032db' }
        break;
      case 'Логово Магдеридона':
        background = { backgroundColor: '#678933' }
        break;
      case 'Ульдуар 25':
        background = { backgroundColor: '#8f4040' }
        break;
      case 'ИВК 25':
        background = { backgroundColor: '#003091', color: '#fbe0ae' }
        break;
      case 'героик Логово Груула':
        background = { backgroundColor: '#58331b', color: '#fbe0ae' }
        break;
      case 'героик Логово Магдеридона':
        background = { backgroundColor: '#3e5c0f', color: '#fbe0ae' }
        break;
      case 'Каражан об':
        background = { backgroundColor: '#8567a3cc' }
        break;
      case 'Каражан гер':
        background = { backgroundColor: '#47315c', color: '#fbe0ae' }
        break;
      case 'ИК 10 об':
        background = { backgroundColor: '#6a9ef5' }
        break;
      case 'ИВК 10 гер':
        background = { backgroundColor: '#3a5178', color: '#fbe0ae' }
        break;
      case 'Ульдуар 10':
        background = { backgroundColor: '#ad4343' }
        break;
      default:
        background = { backgroundColor: 'white' }
    }
    return background
  }

  // Открытие формы
  const handleOpenModal = (date: Date | null) => {
    setShowingEventForm(true)
    setSelectedDate(date)
  }

  // Изменение события
  const changeEvent = (event: IEvents) => {
    setShowingEventForm(false)
    dbApi.postEvent(event)
  }

  return (

    <section className="schedule">

      <nav className="schedule__navigation">
        На главную страницу
      </nav>
      <h1 className="schedule__header">Расписание рейдов</h1>
      <CSSTransition
        in={!isScroll}
        classNames={`${(isScrollUp && 'scroll') || (isScrollDown && 'scrolldown')}`}
        timeout={500}
        onExit={() => setIsScroll(false)}
      >
        <div className={`schedule__block ${toggleStyle ? 'schedule__block_style_second' : ''}`}
          onWheel={hundleMouseUp} >

          {data.map((element, index) =>
            <article className={`card ${toggleStyle ? 'card_style_second' : ''}`} key={index}>
              <p className="card__date">{`${nowDateWithoutTime.getTime() === element.date.getTime() ? 'Cегодня,' : ''}
             ${element.date.getDate()} ${arrMonthName[element.date.getMonth()]}`}</p>
              <div className="card__layout-element">
                {/* {events && findEvents(element.date, element.eventsOfDay)} */}
                {element.eventsOfDay.length === 0 ?
                  <div className="card__element" /* style={cardStyle(element)} */>
                    <div className="card__element-top">
                      <span className="card__element-title"></span>
                      <button className="card__change-event-button"
                        onClick={() => handleOpenModal(element.date)}></button>
                    </div>
                    <span className="card__element-owner"></span>
                    <span className="card__element-time"></span>
                  </div>
                  :
                  element.eventsOfDay.map((event) =>
                    <div className="card__element" style={cardStyle(event)} key={event.id}>
                      <div className="card__element-top">
                        <span className="card__element-title">{event.name}</span>
                        <button className="card__change-event-button"
                          onClick={() => handleOpenModal(element.date)}></button>
                      </div>
                      <span className="card__element-owner">{event.raidleader}</span>
                      <span className="card__element-time">{event.time}</span>
                    </div>)}
              </div>
            </article>
          )}
        </div>
      </CSSTransition>
      <button className="schedule__style-button" onClick={() => setToggleStyle(!toggleStyle)}></button>

      ({showingEventForm &&
        <EventForm
          date={selectedDate}
          submit={changeEvent}
          title={'Изменить событие'}
          setShowingEventForm={setShowingEventForm}
        />
      })
    </section>
  )
}

export default Schedule
