const Schedule = () => {
  return (
    <section className="schedule">
      <nav className="schedule__navigation">
        На главную страницу
      </nav>
      <h1 className="schedule__header">Расписание рейдов</h1>
      <div className="chedule__block">
        <article className="card">
          <p className="card__date">Сегодня</p>
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

        </article>
      </div>

    </section>
  )
}

export default Schedule
