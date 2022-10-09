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

  return (
    <section className="schedule">
      <nav className="schedule__navigation">
        На главную страницу
      </nav>
      <h1 className="schedule__header">Расписание рейдов</h1>
      <div className="chedule__block">
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
