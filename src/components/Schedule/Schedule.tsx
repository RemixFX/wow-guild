import React, { WheelEvent, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Schedule = () => {

  interface IArrAllDays {
    date: Date;
    events?: [
      {
        name: string,
        type: string;
      }
    ]
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

  const arrAllDays: IArrAllDays[] = []
  const startingDate = new Date(nowYear, nowMonth - 1)

  for (let i = 0; i < previousMonthDays + monthDays + nextMonthDays; i++) {
    const date = new Date(startingDate)
    arrAllDays.push({ date })
    startingDate.setDate(startingDate.getDate() + 1)
  }

  const ROW_COUNT: number = 7

const dispatch = useAppDispatch();
const { loggedIn } = useAppSelector(state => state.admin)
console.log(loggedIn)


  const indexCurrentData = arrAllDays.findIndex(((element) =>
    element.date.getTime() === nowDateWithoutTime.getTime()))
  let currentArr: IArrAllDays[] = arrAllDays.slice(indexCurrentData, indexCurrentData + 7)

  const [data, setData] = useState(currentArr)
  const [index, setIndex] = useState(1)
  const [isScrollUp, setIsScrollUp] = useState(false)
  const [isScrollDown, setIsScrollDown] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const [toggleStyle, setToggleStyle] = useState(false)

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
    if (element.date)
      return {backgroundColor: '#7cc210'}
  }

  return (
    <CSSTransition
      in={!isScroll}
      classNames={`${(isScrollUp && 'scroll') || (isScrollDown && 'scrolldown')}`}
      timeout={500}
      onExit={() => setIsScroll(false)}
    >
      <section className="schedule">
        <nav className="schedule__navigation">
          На главную страницу
        </nav>
        <h1 className="schedule__header">Расписание рейдов</h1>
        <div className={`schedule__block ${toggleStyle ? 'schedule__block_style_second' : ''}`}
          onWheel={hundleMouseUp} >
          {data.map((element, index) =>
            <article className={`card ${toggleStyle ? 'card_style_second' : ''}`} key={index}>
              <p className="card__date">{`${nowDateWithoutTime.getTime() === element.date.getTime() ? 'Cегодня,' : ''}
             ${element.date.getDate()} ${arrMonthName[element.date.getMonth()]}`}</p>
              <div className="card__layout-element">
                <div className="card__element" style={cardStyle(element)}>
                  <span className="card__element-title">ИВК 25</span>
                  <span className="card__element-owner">РЛ</span>
                  <span className="card__element-time">19-30</span>
                </div>
                <div className="card__element" style={{ backgroundColor: '#7cc210' }}>
                  <span className="card__element-title"></span>
                  <span className="card__element-owner"></span>
                  <span className="card__element-time"></span>
                </div>
                <div className="card__element" style={{ backgroundColor: '#7cc210' }}>
                  <span className="card__element-title">ИВК 25</span>
                  <span className="card__element-owner">РЛ: dsddddddd3dsa</span>
                  <span className="card__element-time">19-30</span>
                </div>
                <div className="card__element card__element_admin" style={{ backgroundColor: '#7cc210' }}>
                  <span className="card__element-title"></span>
                  <span className="card__element-owner"></span>
                  <span className="card__element-time"></span>
                </div>
              </div>
            </article>
          )}
        </div>
        <button className="schedule__style-button" onClick={() => setToggleStyle(!toggleStyle)}></button>
      </section>
    </CSSTransition>
  )
}

export default Schedule
