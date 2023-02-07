import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { INews } from '../../models/newsModel';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import InfoSlider from '../InfoSlider/infoSlider';
import NewsContent from '../NewsContent/NewsContent';
import PreloaderTable from '../PreloaderTable/PreloaderTable';

function News(props: any) {

  const [activeNewsGuild, setActiveNewsGuild] = React.useState('');
  const [activeNewsServer, setActiveNewsServer] = React.useState('active');
  const { isShowOnline } = useAppSelector(state => state.online)
  const {
    serverNews,
    loadingServerNews,
    errorServerNews,
    guildNews,
    loadingGuildNews,
    errorGuildNews
  } = useAppSelector(state => state.news)

  return (
    <CSSTransition
      in={!isShowOnline}
      classNames='transform-news'
      timeout={2000}
    >
      <section className='news'>
        <div className="tab">
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
        {activeNewsGuild === 'active' &&
          <div className='tabcontent'>
            {loadingGuildNews && <PreloaderTable />}
            {errorGuildNews.isError &&
            <p className="tabcontent__error">{errorGuildNews.message}</p>}
            {guildNews.map((message) =>
              <NewsContent message={message} key={message.id} />
            )}
          </div>
        }
        {activeNewsServer === 'active' &&
          <div className='tabcontent'>
            {loadingServerNews && <PreloaderTable />}
            {errorServerNews.isError &&
              <p className="tabcontent__error">{errorServerNews.message}</p>}
            {serverNews.map((message) =>
              <NewsContent message={message} key={message.id} />
            )}
          </div>
        }

      </section>
    </CSSTransition>
  )

}

export default News;
