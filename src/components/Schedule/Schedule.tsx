import React, { WheelEvent, useState, useEffect } from "react";
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


  let nowDate = new Date();
  //let curDate = new Date(year, month, day);
  let arrMonthName = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  let monthName = arrMonthName[nowDate.getMonth()]
  let nowDateNumber = nowDate.getDate()
  let nowMonth = nowDate.getMonth()
  let nowYear = nowDate.getFullYear()
  const nowDateWithoutTime = new Date(nowYear, nowMonth, nowDateNumber)
  let monthDays = new Date(nowYear, nowMonth + 1, 0).getDate()
  let previousMonthDays = new Date(nowYear, nowMonth, 0).getDate()
  let nextMonthDays = new Date(nowYear, nowMonth + 2, 0).getDate()





  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  const { loggedIn } = useAppSelector(state => state.admin)
  const { events, loading, error } = useAppSelector(state => state.schedule)


  const findEvent = (date: Date) => {

      return events.filter((event) => event.date.getTime() === date.getTime())

  }

  const arrAllDays: IArrAllDays[] = []
  const startingDate = new Date(nowYear, nowMonth - 1)
  for (let i = 0; i < previousMonthDays + monthDays + nextMonthDays; i++) {
    const date = new Date(startingDate)
    arrAllDays.push({ date, eventsOfDay: events })
    startingDate.setDate(startingDate.getDate() + 1)
  }
  events.forEach((e) => console.log(`${e.date.}`))
  arrAllDays.forEach((e) => console.log(e.date.toISOString()))

  const ROW_COUNT: number = 7


  //"2022-08-31T21:00:00.000Z"





  const indexCurrentData = arrAllDays.findIndex(((element) =>
    element.date.getTime() === nowDateWithoutTime.getTime()))
  let currentArr: IArrAllDays[] = arrAllDays.slice(indexCurrentData, indexCurrentData + 7)

  const [data, setData] = useState(currentArr)
  const [index, setIndex] = useState(1)
  const [isScrollUp, setIsScrollUp] = useState(false)
  const [isScrollDown, setIsScrollDown] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const [toggleStyle, setToggleStyle] = useState(false)
  const [showingEventForm, setShowingEventForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const hundleMouseUp = (e: WheelEvent) => {
    setIsScroll(true)

    if (e.deltaY < 0) {
      setIsScrollDown(false)
      setIsScrollUp(true)
      console.log(arrAllDays[indexCurrentData - index])
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

  const cardStyle = (element: IArrAllDays) => {
    if (element)
      return { backgroundColor: '#7cc210' }
  }

  const handleOpenModal = (date: Date | null) => {
    setShowingEventForm(true)
    setSelectedDate(date)
  }

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
                {element.eventsOfDay.map((event) =>
                  <div className="card__element" style={cardStyle(element)} key={event.id}>
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
