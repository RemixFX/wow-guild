import React, { WheelEvent } from "react";
import { isNumberObject } from "util/types";

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


  const indexCurrentData = arrAllDays.findIndex(((element) =>
    element.date.getTime() === nowDateWithoutTime.getTime()))
  console.log(arrAllDays)
  let currentArr: IArrAllDays[] = arrAllDays.slice(indexCurrentData, indexCurrentData + 7)

  const [data, setData] = React.useState(currentArr)
  const [index, setIndex] = React.useState(4)

  const hundleMouseUp = (e: WheelEvent) => {
    if (e.deltaY < 0) {
      console.log(arrAllDays[indexCurrentData - index])
      if (index > indexCurrentData) return
      setData((data.unshift(
        arrAllDays[indexCurrentData - index],
        arrAllDays[indexCurrentData - (index - 1)],
        arrAllDays[indexCurrentData - (index - 2)],
        arrAllDays[indexCurrentData - (index - 3)]
      ), data).slice(0, 7));
      setIndex(index + 4)
    } else {
      console.log(index, arrAllDays[indexCurrentData - index])
      if (-(index - 15) + indexCurrentData > arrAllDays.length) return
      setData((data.push(
        arrAllDays[indexCurrentData - (index - 11)],
        arrAllDays[indexCurrentData - (index - 12)],
        arrAllDays[indexCurrentData - (index - 13)],
        arrAllDays[indexCurrentData - (index - 14)]
      ), data).slice(4, 11));
      setIndex(index - 4)
    }

  }

  return (
    <section className="schedule">
      <nav className="schedule__navigation">
        На главную страницу
      </nav>
      <h1 className="schedule__header">Расписание рейдов</h1>
      <div className="schedule__block" onWheel={hundleMouseUp} >
        {data.map((element, index) =>
          <article className="card" key={index}>
            <p className="card__date">{`${element.date.getDate()} ${arrMonthName[element.date.getMonth()]}`}</p>
            <div className="card__layout-element">
              <div className="card__element" style={{ backgroundColor: '#7cc210' }}>
                <span className="card__element-title">ИВК 25</span>
                <span className="card__element-owner">РЛ</span>
                <span className="card__element-time">19-30</span>
              </div>
              <div className="card__element" style={{ backgroundColor: '#7cc210' }}>
                <span className="card__element-title">ИВК 25</span>
                <span className="card__element-owner">РЛ</span>
                <span className="card__element-time">19-30</span>
              </div>
              <div className="card__element" style={{ backgroundColor: '#7cc210' }}>
                <span className="card__element-title">ИВК 25</span>
                <span className="card__element-owner">РЛ: dsddddddd3dsa</span>
                <span className="card__element-time">19-30</span>
              </div>
              <div className="card__element card__element_hidden" style={{ backgroundColor: '#7cc210' }}>
                <span className="card__element-title"></span>
                <span className="card__element-owner"></span>
                <span className="card__element-time"></span>
              </div>
            </div>
          </article>
        )}
      </div>

    </section>
  )
}

export default Schedule
