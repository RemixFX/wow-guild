import { FormEvent, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { postNewsGuild } from '../../store/reducers/ActionCreators';
import { newsSlice } from '../../store/reducers/newsSlice';
import { useInput } from '../../utils/Validations';
import InfoSlider from '../InfoSlider/infoSlider';
import NewsContent from '../NewsContent/NewsContent';
import Preloader from '../Preloader/Preloader';
import PreloaderTable from '../PreloaderTable/PreloaderTable';

const News = () => {

  const [activeNewsGuild, setActiveNewsGuild] = useState('active')
  const [activeNewsServer, setActiveNewsServer] = useState('')
  const { isShowOnline } = useAppSelector(state => state.online)
  const formInput = useInput('', { minLength: 2, isEmpty: true })
  const [isCheckValid, setIsCheckValid] = useState(true)
  const dispatch = useAppDispatch();
  const { currentUser, loggedIn } = useAppSelector(state => state.admin)
  const {
    serverNews,
    loadingServerNews,
    errorServerNews,
    guildNews,
    loadingGuildNews,
    errorGuildNews,
    loadingPostGuildNews,
    errorPostGuildNews,
    errorDeleteGuildNews,
    isOpenForm
  } = useAppSelector(state => state.news)

  // Закрытие формы добавления новости если она открыта при рендере компонента
  useEffect(() => {
    dispatch(newsSlice.actions.isClosingForm())
  }, [])

  // Отправка и сохранение новости
  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formInput.inputValid) {
      dispatch(postNewsGuild(formInput.value, currentUser))
    } else {
      setIsCheckValid(false)
    }
  }

  // Открытие формы добавления новости
  const handleOpenForm = () => {
    dispatch(newsSlice.actions.isOpeningForm())
  }

  // Закрытие формы добавления новости
  const handleCloseForm = () => {
    dispatch(newsSlice.actions.isClosingForm())
    setIsCheckValid(true)
  }

  return (
    <CSSTransition
      in={!isShowOnline}
      classNames='transform-news'
      timeout={2000}
    >
      <section className='news'>
        {errorPostGuildNews.isError && <InfoSlider infoMessage="Ошибка сервера. Не удалось добавить новость" error={true} />}
        {errorDeleteGuildNews.isError && <InfoSlider infoMessage="Ошибка сервера. Не удалось удалить новость" error={true} />}
        <div className="tab">
          <div className='tab__block'>
            <button
              className={`tablinks ${activeNewsGuild}`}
              onClick={() => {
                setActiveNewsServer('')
                setActiveNewsGuild('active')
              }}
            >Новости гильдии</button>
            <button
              className={`tablinks ${activeNewsServer}`}
              onClick={() => {
                setActiveNewsServer('active')
                setActiveNewsGuild('')
              }}
            >Новости сервера</button>
          </div>
          {(loggedIn && activeNewsGuild) &&
            <button className='tab__open-form' type='button'
              onClick={isOpenForm ? handleCloseForm : handleOpenForm}>Добавить новость</button>
          }
        </div>
        {activeNewsGuild === 'active' &&
          <div className='tabcontent'>
            {(loggedIn && isOpenForm) &&
              <div className='news-form'>
                <form onSubmit={e => submitForm(e)}>
                  <label htmlFor='newstext' className='news-form__label'> Введите текст Новости
                    <textarea className='news-form__input' id='newstext'
                      style={loadingPostGuildNews ? { opacity: '0.3' } : { opacity: '1' }}
                      placeholder='Описание новости' onChange={e => formInput.onChange(e)} />
                  </label>
                  <div className='news-form__buttons'>
                    <button className='news-form__button'>Сохранить</button>
                    <button className='news-form__button' type='button'
                      onClick={handleCloseForm} >Закрыть</button>
                  </div>
                  <span className='news-form__error'>{!isCheckValid && formInput.error}</span>
                </form>
                {loadingPostGuildNews && <Preloader addClass={'news-preloader'} />}
              </div>
            }
            {loadingGuildNews && <PreloaderTable />}
            {errorGuildNews.isError &&
              <p className="tabcontent__error">{errorGuildNews.message}</p>}
            {guildNews.map((message) =>
              <NewsContent message={message} key={message.id} activeNewsGuild={activeNewsGuild} />
            )}
          </div>
        }
        {activeNewsServer === 'active' &&
          <div className='tabcontent'>
            {loadingServerNews && <PreloaderTable />}
            {errorServerNews.isError &&
              <p className="tabcontent__error">{errorServerNews.message}</p>}
            {serverNews.map((message) =>
              <NewsContent message={message} key={message.id} activeNewsGuild={activeNewsGuild} />
            )}
          </div>
        }
      </section>
    </CSSTransition>
  )

}

export default News;
