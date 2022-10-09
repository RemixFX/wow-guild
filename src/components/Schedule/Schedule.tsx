const Schedule = () => {

  const card = [
    {date: 1},
    {date: 2},
    {date: 3},
    {date: 4},
    {date: 5},
    {date: 6},
    {date: 7}
  ]
  let nowDate = new Date();
  //let curDate = new Date(year, month, day);
  let arrMonthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
  let monthName = arrMonthName[nowDate.getMonth()]
  let nowDateNumber = nowDate.getDate()
  let nowMonth = nowDate.getMonth()
  let nowYear = nowDate.getFullYear()
  let monthDays = new Date(nowYear, nowMonth + 1, 0).getDate()
  let previousMonthDays = new Date(nowYear, nowMonth, 0).getDate()
  let nextMonthDays = new Date(nowYear, nowMonth, 0).getDate()

  let arrMonthDays: string[] = []
  for (let i = 1; i <= monthDays ; i++){
    arrMonthDays.push(String(i));
  }
  let arrPreviousMonthDays: string[] = []
  for (let i = 1; i <= previousMonthDays ; i++){
    arrPreviousMonthDays.push(String(i));
  }
  let arrNextMonthDays: string[] = []
  for (let i = 1; i <= nextMonthDays ; i++){
    arrNextMonthDays.push(String(i));
  }
  const arrAllDays: string[] = arrPreviousMonthDays.concat(arrMonthDays, arrNextMonthDays)
  let indexCurrentData: number = Number(arrPreviousMonthDays.length) + Number(arrMonthDays[nowDateNumber - 1])
  let arrCurrent: string[] = arrAllDays.slice(
    indexCurrentData - 1, indexCurrentData + 6
  )

  const hundleMouseUp = () => {
    arrCurrent = arrCurrent.slice(0, 4)
    arrCurrent.unshift(arrAllDays[indexCurrentData -4], arrAllDays[indexCurrentData -3], arrAllDays[indexCurrentData -2])
    indexCurrentData = indexCurrentData - 3
    console.log(arrCurrent)
  }

  //console.log(hundleMouseUp())



  return (
    <section className="schedule">
      <nav className="schedule__navigation">
        На главную страницу
      </nav>
      <h1 className="schedule__header">Расписание рейдов</h1>
      <div className="schedule__block" onClick={hundleMouseUp}>
        {card.map((element) =>
        (<article className="card" key={element.date}>
          <p className="card__date">{element.date}</p>
          <div className="card__layout-element">
            <div className="card__element" style={{backgroundColor: '#7cc210'}}>
              <span className="card__element-title">ИВК 25</span>
              <span className="card__element-owner">РЛ</span>
              <span className="card__element-time">19-30</span>
            </div>
            <div className="card__element" style={{backgroundColor: '#7cc210'}}>
              <span className="card__element-title">ИВК 25</span>
              <span className="card__element-owner">РЛ</span>
              <span className="card__element-time">19-30</span>
            </div>
            <div className="card__element" style={{backgroundColor: '#7cc210'}}>
              <span className="card__element-title">ИВК 25</span>
              <span className="card__element-owner">РЛ: dsddddddd3dsa</span>
              <span className="card__element-time">19-30</span>
            </div>
            <div className="card__element card__element_hidden" style={{backgroundColor: '#7cc210'}}>
              <span className="card__element-title"></span>
              <span className="card__element-owner"></span>
              <span className="card__element-time"></span>
            </div>
          </div>
        </article>)
        )}
      </div>

    </section>
  )
}

export default Schedule
